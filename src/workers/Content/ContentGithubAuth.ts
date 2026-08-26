/**
 * Workers - Content Github Auth
 */

import type { ContentEnv } from './ContentTypes.js'
import { SignJWT, importPKCS8 } from 'jose'

/**
 * User agent sent on every GitHub request.
 *
 * @type {string}
 */
// Required — without it GitHub answers 403 without saying why
const githubUserAgent: string = 'alaniz-creative-content-worker'

/**
 * The algorithm GitHub requires for app tokens.
 *
 * @type {string}
 */
const githubJwtAlgorithm: string = 'RS256'

/**
 * Where the installation token is cached between requests.
 *
 * @type {string}
 */
const githubTokenKey: string = 'github:installation-token'

/**
 * How long an installation token is cached, short of the hour it lasts.
 *
 * @type {number}
 */
const githubTokenTtl: number = 3000

/**
 * Import the app private key for signing.
 *
 * @param {string} pem
 * @return {Promise<CryptoKey>}
 * @throws {Error} When the key is not PKCS#8.
 */
const importAppKey = async (pem: string): Promise<CryptoKey> => {
  const key = pem.trim()

  if (!key.startsWith('-----BEGIN PRIVATE KEY-----')) {
    throw new Error(
      'The GitHub app key is not PKCS#8. Convert it with openssl before storing it — see the Content worker readme.'
    )
  }

  return await importPKCS8(key, githubJwtAlgorithm)
}

/**
 * Mint a short lived app JWT, used only to buy an installation token.
 *
 * @param {ContentEnv} env
 * @return {Promise<string>}
 */
const getAppJwt = async (env: ContentEnv): Promise<string> => {
  const now = Math.floor(Date.now() / 1000)
  const key = await importAppKey(env.GITHUB_APP_PRIVATE_KEY)

  return await new SignJWT()
    .setProtectedHeader({ alg: githubJwtAlgorithm, typ: 'JWT' })
    .setIssuedAt(now - 60) // Allow for clock drift between here and GitHub
    .setExpirationTime(now + 540) // GitHub rejects anything over ten minutes
    .setIssuer(env.GITHUB_APP_ID)
    .sign(key)
}

/**
 * Get an installation token, from cache where possible.
 *
 * @param {ContentEnv} env
 * @return {Promise<string>}
 * @throws {Error} When GitHub refuses to issue a token.
 */
const getInstallationToken = async (env: ContentEnv): Promise<string> => {
  const cached = await env.CONTENT_KV.get(githubTokenKey)

  if (cached) {
    return cached
  }

  const jwt = await getAppJwt(env)
  const res = await fetch(
    `https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': githubUserAgent
      }
    }
  )

  if (!res.ok) {
    throw new Error(`Could not authenticate with GitHub (${res.status}): ${await res.text()}`)
  }

  const data = await res.json<{ token?: string }>()
  const token = data.token

  if (!token) {
    throw new Error('GitHub returned no installation token')
  }

  await env.CONTENT_KV.put(githubTokenKey, token, { expirationTtl: githubTokenTtl })

  return token
}

export {
  githubUserAgent,
  getInstallationToken
}
