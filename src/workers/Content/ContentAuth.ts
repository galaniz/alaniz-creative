/**
 * Workers - Content Auth
 */

/* Imports */

import type { AuthRequest } from '@cloudflare/workers-oauth-provider'
import type { ContentEnv } from './ContentTypes.js'
import { AuthorizationError } from '@cloudflare/workers-oauth-provider'
import { escape } from '@alanizcreative/formation-static/utils/escape/escape.js'
import { getAccessIdentity } from './ContentAccess.js'

/**
 * Scope the connector is granted.
 *
 * @type {string}
 */
const contentScope: string = 'content:edit'

/**
 * The page asking the editor to confirm a connection.
 *
 * @param {string} clientName
 * @param {string} email
 * @param {string} query
 * @return {Response}
 */
const getConsentPage = (clientName: string, email: string, query: string): Response => {
  const body = /* html */`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Connect to alanizcreative.com</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font: 16px/1.5 system-ui, sans-serif;
      max-width: 30rem;
      margin: 6rem auto;
      padding: 0 1.25rem;
    }
    h1 { font-size: 1.35rem; }
    ul { padding-left: 1.1rem; }
    li { margin-bottom: .35rem; }
    button {
      font: inherit;
      font-weight: 500;
      padding: .6rem 1.1rem;
      border-radius: .4rem;
      border: 1px solid currentcolor;
      background: currentcolor;
      cursor: pointer;
    }
    button span { color: Canvas; }
    p.who { color: color-mix(in srgb, currentcolor 60%, transparent); }
  </style>
</head>
<body>
  <h1>Connect ${escape(clientName)} to alanizcreative.com?</h1>
  <p>It will be able to:</p>
  <ul>
    <li>Read every page on the site</li>
    <li>Stage changes as a pull request with a preview</li>
    <li>Publish a staged change once you have approved it</li>
  </ul>
  <p class="who">Signed in as ${escape(email)}.</p>
  <form method="post" action="/authorize?${escape(query)}">
    <button type="submit"><span>Connect</span></button>
  </form>
</body>
</html>`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  })
}

/**
 * Turn an authorization error into the redirect or page the spec calls for.
 *
 * @param {AuthorizationError} error
 * @return {Response}
 */
const getAuthError = (error: AuthorizationError): Response => {
  if (!error.redirectUri) { // An unknown client has nowhere safe to be sent
    return new Response(error.description, { status: 400 })
  }

  const redirect = new URL(error.redirectUri)

  redirect.searchParams.set('error', error.code)
  redirect.searchParams.set('error_description', error.description)

  if (error.state) {
    redirect.searchParams.set('state', error.state)
  }

  if (error.issuer) {
    redirect.searchParams.set('iss', error.issuer)
  }

  return Response.redirect(redirect.toString(), 302)
}

/**
 * Run the authorization step of the connector's OAuth flow, identifying the
 * editor through Cloudflare Access.
 *
 * @param {Request} request
 * @param {ContentEnv} env
 * @return {Promise<Response>}
 */
const handleAuthorize = async (request: Request, env: ContentEnv): Promise<Response> => {
  const identity = await getAccessIdentity(request, env)

  if (!identity) {
    return new Response('Not authorised', { status: 403 })
  }

  let auth: AuthRequest

  try {
    auth = await env.OAUTH_PROVIDER.parseAuthRequest(request)
  } catch (error) {
    if (!(error instanceof AuthorizationError)) {
      throw error
    }

    return getAuthError(error)
  }

  const client = await env.OAUTH_PROVIDER.lookupClient(auth.clientId)

  if (!client) {
    return new Response('Unknown OAuth client', { status: 400 })
  }

  if (request.method !== 'POST') {
    return getConsentPage(
      client.clientName ?? 'This client',
      identity.email,
      new URL(request.url).searchParams.toString()
    )
  }

  const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
    request: auth,
    userId: identity.email,
    metadata: { clientName: client.clientName },
    scope: auth.scope.filter(scope => scope === contentScope),
    props: identity
  })

  return Response.redirect(redirectTo, 302)
}

/* Exports */

export {
  contentScope,
  handleAuthorize
}
