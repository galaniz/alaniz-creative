/**
 * Workers - Content Access
 */

/* Imports */

import type { ContentEnv, ContentProps } from './ContentTypes.js'
import type { JWK } from 'jose'
import { decodeProtectedHeader, importJWK, jwtVerify } from 'jose'

/**
 * Where the Access signing keys are cached between requests.
 *
 * @type {string}
 */
const accessKeysKey: string = 'access:keys'

/**
 * The algorithm Cloudflare Access signs its assertions with.
 *
 * @type {string}
 */
const accessJwtAlgorithm: string = 'RS256'

/**
 * @typedef {object} ContentAccessKeys
 * @prop {JWK[]} keys
 */
interface ContentAccessKeys {
  keys: JWK[]
}

/**
 * Fetch the Access signing keys, from cache where possible.
 *
 * @param {ContentEnv} env
 * @return {Promise<ContentAccessKeys>}
 */
const getAccessKeys = async (env: ContentEnv): Promise<ContentAccessKeys> => {
  const cached = await env.CONTENT_KV.get(accessKeysKey)

  if (cached) {
    return JSON.parse(cached) as ContentAccessKeys
  }

  // Needs global_fetch_strictly_public in wrangler.json, or this is routed
  // internally rather than out to the public internet and answers 403
  const res = await fetch(`https://${env.CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`)

  if (!res.ok) {
    throw new Error(`Could not fetch Cloudflare Access keys (${res.status})`)
  }

  const keys = await res.json<ContentAccessKeys>()

  await env.CONTENT_KV.put(accessKeysKey, JSON.stringify(keys), { expirationTtl: 3600 })

  return keys
}

/**
 * Verify the Cloudflare Access assertion on a request and identify the editor
 * behind it.
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

  let kid: string | undefined

  try {
    kid = decodeProtectedHeader(token).kid
  } catch {
    return undefined
  }

  if (!kid) {
    return undefined
  }

  const { keys } = await getAccessKeys(env)
  const key = keys.find(k => k.kid === kid)

  if (!key) {
    return undefined
  }

  let email: unknown

  try {
    const { payload } = await jwtVerify(token, await importJWK(key, accessJwtAlgorithm), {
      algorithms: [accessJwtAlgorithm],
      issuer: `https://${env.CF_ACCESS_TEAM_DOMAIN}`,
      audience: env.CF_ACCESS_AUD,
      requiredClaims: ['exp']
    })

    email = payload.email
  } catch {
    return undefined
  }

  if (typeof email !== 'string' || !email) {
    return undefined
  }

  return {
    email,
    name: email.split('@')[0] ?? email
  }
}

/* Exports */

export { getAccessIdentity }
