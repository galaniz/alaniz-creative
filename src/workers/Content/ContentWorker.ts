/**
 * Workers - Content
 */

/* Imports */

import type { ContentEnv, ContentProps } from './ContentTypes.js'
import { OAuthProvider } from '@cloudflare/workers-oauth-provider'
import {
  WebStandardStreamableHTTPServerTransport
} from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { getMcpServer } from './ContentMcp.js'
import { handleMedia } from './ContentMedia.js'
import { contentScope, handleAuthorize } from './ContentAuth.js'

/**
 * Serve the MCP endpoint Claude talks to.
 *
 * A transport and a server are built per request and thrown away with it.
 * There is no session to keep, so there is no durable object either — the
 * tools are stateless and the state that matters lives in the repo.
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

    if (pathname === '/authorize') {
      return await handleAuthorize(request, env)
    }

    if (pathname === '/media' || pathname.startsWith('/media/')) {
      return await handleMedia(request, env)
    }

    return new Response('Not found', { status: 404 })
  }
}

/**
 * Manage site content over MCP, and site images over the web.
 *
 * The provider owns the OAuth endpoints. `/register` is among them and is not
 * optional — Claude registers itself as a client dynamically, and without that
 * endpoint the connector fails to connect without saying why.
 */
export default new OAuthProvider<ContentEnv>({
  apiRoute: '/mcp',
  apiHandler: mcpHandler,
  defaultHandler: contentHandler,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
  scopesSupported: [contentScope]
})
