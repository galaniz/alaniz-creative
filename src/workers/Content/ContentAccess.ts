/**
 * Workers - Content Access
 */

/* Imports */

import type { ContentEnv, ContentProps } from './ContentTypes.js'
import { decodeBase64Url, verifyJwt } from './ContentJwt.js'

/**
 * Where the Access signing keys are cached between requests.
 *
 * @type {string}
 */
const accessKeysKey: string = 'access:keys'

/**
 * @typedef {object} ContentAccessKeys
 * @prop {JsonWebKey[]} keys
 */
interface ContentAccessKeys {
  keys: (JsonWebKey & { kid?: string })[]
}

/**
 * Fetch the Access signing keys, from cache where possible.
 *
 * This endpoint is public, but a worker subrequest to a Cloudflare proxied
 * hostname can be routed internally rather than out to the public internet,
 * where it answers 403. The `global_fetch_strictly_public` compatibility flag
 * in `wrangler.json` is what stops that, and removing it breaks this.
 *
 * @param {ContentEnv} env
 * @return {Promise<ContentAccessKeys>}
 */
const getAccessKeys = async (env: ContentEnv): Promise<ContentAccessKeys> => {
  const cached = await env.CONTENT_KV.get(accessKeysKey)

  if (cached) {
    return JSON.parse(cached) as ContentAccessKeys
  }

  const res = await fetch(`https://${env.CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)

  if (!res.ok) {
    throw new Error(`Could not fetch Cloudflare Access keys (${res.status})`)
  }

  const keys = await res.json<ContentAccessKeys>()

  await env.CONTENT_KV.put(accessKeysKey, JSON.stringify(keys), { expirationTtl: 3600 })

  return keys
}

/**
 * Identify the editor behind a request, from the assertion Cloudflare Access
 * puts on it.
 *
 * Access already turned anyone away at the edge, but the worker has its own
 * hostname and can be reached directly, so the assertion is verified here too
 * rather than trusted because it is present.
 *
 * @param {Request} request
 * @param {ContentEnv} env
 * @return {Promise<ContentProps|undefined>}
 */
const getAccessIdentity = async (
  request: Request,
  env: ContentEnv
): Promise<ContentProps | undefined> => {
  const token =
    request.headers.get('Cf-Access-Jwt-Assertion') ??
    /CF_Authorization=([^;]+)/.exec(request.headers.get('Cookie') ?? '')?.[1]

  if (!token) {
    return undefined
  }

  const header = token.split('.')[0]

  if (!header) {
    return undefined
  }

  let kid: string | undefined

  try {
    const parsed = JSON.parse(new TextDecoder().decode(decodeBase64Url(header))) as { kid?: string }
    kid = parsed.kid
  } catch {
    return undefined
  }

  const { keys } = await getAccessKeys(env)
  const key = keys.find(k => k.kid === kid)

  if (!key) {
    return undefined
  }

  const claims = await verifyJwt(token, key)

  if (!claims) {
    return undefined
  }

  const { aud, exp, iss, email } = claims as {
    aud?: string | string[]
    exp?: number
    iss?: string
    email?: string
  }

  const audiences = Array.isArray(aud) ? aud : [aud]

  if (!audiences.includes(env.CF_ACCESS_AUD)) {
    return undefined
  }

  if (!exp || exp * 1000 < Date.now()) {
    return undefined
  }

  if (iss !== `https://${env.CF_ACCESS_TEAM_DOMAIN}`) {
    return undefined
  }

  if (!email) {
    return undefined
  }

  return {
    email,
    name: email.split('@')[0] ?? email
  }
}

/* Exports */

export { getAccessIdentity }
