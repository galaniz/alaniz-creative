/**
 * Workers - Content Github Auth
 */

/* Imports */

import type { ContentEnv } from './ContentTypes.js'
import { signJwt } from './ContentJwt.js'

/**
 * Sent on every GitHub request. Without it GitHub answers with a 403 that does
 * not say why.
 *
 * @type {string}
 */
const githubUserAgent: string = 'alaniz-creative-content-worker'

/**
 * Where the installation token is cached between requests.
 *
 * @type {string}
 */
const githubTokenKey: string = 'github:installation-token'

/**
 * Installation tokens last an hour. Caching for fifty minutes leaves room for
 * a slow request to finish on a token that was fresh when it started.
 *
 * @type {number}
 */
const githubTokenTtl: number = 3000

/**
 * Mint a short lived app JWT.
 *
 * This proves the request comes from the app itself. It cannot touch the repo
 * on its own — it only buys an installation token.
 *
 * @param {ContentEnv} env
 * @return {Promise<string>}
 */
const getAppJwt = async (env: ContentEnv): Promise<string> => {
  const now = Math.floor(Date.now() / 1000)

  return await signJwt({
    iat: now - 60, // Allow for clock drift between here and GitHub
    exp: now + 540, // GitHub rejects anything over ten minutes
    iss: env.GITHUB_APP_ID
  }, env.GITHUB_APP_PRIVATE_KEY)
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

/* Exports */

export {
  githubUserAgent,
  getInstallationToken
}
