/**
 * Workers - Content
 */

import type { ContentEnv, ContentProps } from './ContentTypes.js'
import { OAuthProvider } from '@cloudflare/workers-oauth-provider'
import {
  WebStandardStreamableHTTPServerTransport
} from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { getMcpServer } from './ContentMcp.js'
import { handleImageMeta, handleMedia } from './ContentMedia.js'
import { contentScope, handleAuthorize } from './ContentAuth.js'

/**
 * Serve the MCP endpoint Claude talks to, statelessly.
 *
 * @type {object}
 */
const mcpHandler = {
  async fetch (request: Request, env: ContentEnv, ctx: ExecutionContext): Promise<Response> {
    const actor = ctx.props as ContentProps
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless
      enableJsonResponse: true
    })

    const server = getMcpServer(env, actor)

    await server.connect(transport)

    const res = await transport.handleRequest(request)

    ctx.waitUntil(server.close())

    return res
  }
}

/**
 * Serve everything a person, rather than Claude, reaches.
 *
 * @type {object}
 */
const contentHandler = {
  async fetch (request: Request, env: ContentEnv): Promise<Response> {
    const { pathname } = new URL(request.url)

    try {
      if (pathname === '/authorize') {
        return await handleAuthorize(request, env)
      }

      /* Outside `/media` so the Access application does not cover it */

      if (pathname === '/images.json') {
        return await handleImageMeta(env)
      }

      if (pathname === '/media' || pathname.startsWith('/media/')) {
        return await handleMedia(request, env)
      }

      return new Response('Not found', { status: 404 })
    } catch (error) {
      /* Say what happened — an uncaught throw reaches the browser as a worker
         exception carrying a ray id and nothing else */

      return new Response(error instanceof Error ? error.message : 'Something went wrong', {
        status: 500,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }
  }
}

/**
 * Manage site content over MCP, and site images over the web.
 */
// clientRegistrationEndpoint is required — Claude registers itself dynamically
export default new OAuthProvider<ContentEnv>({
  apiRoute: '/mcp',
  apiHandler: mcpHandler,
  defaultHandler: contentHandler,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
  scopesSupported: [contentScope]
})
