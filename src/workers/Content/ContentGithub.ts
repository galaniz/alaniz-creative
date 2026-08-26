/**
 * Workers - Content Github
 */

import type {
  ContentEnv,
  ContentProps,
  ContentPageFile,
  ContentPageSummary,
  ContentGithubContent,
  ContentGithubPull,
  ContentGithubCheck
} from './ContentTypes.js'
import type { SchemaPage } from '../../schema/schemaTypes.js'
import { getInstallationToken, githubUserAgent } from './ContentGithubAuth.js'

/**
 * Directory holding the content files, relative to the repo root.
 *
 * @type {string}
 */
const contentDir: string = 'data'

/**
 * Content types the editing tools own.
 *
 * @type {string[]}
 */
const contentTypes: string[] = [
  'page',
  'work'
]

/**
 * Encode text as base64 for the contents API.
 *
 * @param {string} text
 * @return {string}
 */
const encodeBase64 = (text: string): string => {
  const bytes = new TextEncoder().encode(text)

  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
}

/**
 * Decode base64 from the contents API back into text.
 *
 * @param {string} value
 * @return {string}
 */
const decodeBase64 = (value: string): string => {
  const binary = atob(value.replace(/\s+/g, ''))
  const bytes = new Uint8Array(binary.length)

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }

  return new TextDecoder().decode(bytes)
}

/**
 * Call the GitHub API as the installed app.
 *
 * @param {ContentEnv} env
 * @param {string} path
 * @param {RequestInit} [init]
 * @return {Promise<Response>}
 */
const githubRequest = async (
  env: ContentEnv,
  path: string,
  init: RequestInit = {}
): Promise<Response> => {
  const token = await getInstallationToken(env)
  const headers = new Headers(init.headers)

  headers.set('Authorization', `Bearer ${token}`)
  headers.set('Accept', 'application/vnd.github+json')
  headers.set('X-GitHub-Api-Version', '2022-11-28')
  headers.set('User-Agent', githubUserAgent)

  if (init.body) {
    headers.set('Content-Type', 'application/json')
  }

  return await fetch(`https://api.github.com${path}`, { ...init, headers })
}

/**
 * Call the GitHub API and parse the result.
 *
 * @param {ContentEnv} env
 * @param {string} path
 * @param {RequestInit} [init]
 * @return {Promise<T>}
 * @throws {Error} When GitHub answers with an error.
 */
const githubFetch = async <T>(
  env: ContentEnv,
  path: string,
  init: RequestInit = {}
): Promise<T> => {
  const res = await githubRequest(env, path, init)

  if (!res.ok) {
    throw new Error(`GitHub ${init.method ?? 'GET'} ${path} failed (${res.status}): ${await res.text()}`)
  }

  return await res.json<T>()
}

/**
 * Path in the repo for a content id such as `page--about`.
 *
 * @param {string} id
 * @return {string}
 */
const getContentPath = (id: string): string => `${contentDir}/${id}.json`

/**
 * Branch a staged edit to a page lives on. One branch per page.
 *
 * @param {string} id
 * @return {string}
 */
const getContentBranch = (id: string): string => `content/${id}`

/**
 * Serialise a page the way the repo stores it.
 *
 * @param {SchemaPage} page
 * @return {string}
 */
const serializePage = (page: SchemaPage): string => `${JSON.stringify(page, null, 2)}\n`

/**
 * Repo prefix for API paths.
 *
 * @param {ContentEnv} env
 * @return {string}
 */
const getRepoPath = (env: ContentEnv): string => `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}`

/**
 * Head commit of the branch pages are published to.
 *
 * @param {ContentEnv} env
 * @return {Promise<string>}
 */
const getBaseSha = async (env: ContentEnv): Promise<string> => {
  const ref = await githubFetch<{ object: { sha: string } }>(
    env,
    `${getRepoPath(env)}/git/ref/heads/${env.GITHUB_BASE}`
  )

  return ref.object.sha
}

/**
 * Read a page from the repo, with the blob sha needed to update it later.
 *
 * @param {ContentEnv} env
 * @param {string} id
 * @param {string} [ref]
 * @return {Promise<ContentPageFile>}
 */
const readPage = async (
  env: ContentEnv,
  id: string,
  ref?: string
): Promise<ContentPageFile> => {
  const path = getContentPath(id)
  const query = ref ? `?ref=${encodeURIComponent(ref)}` : ''
  const file = await githubFetch<ContentGithubContent>(
    env,
    `${getRepoPath(env)}/contents/${path}${query}`
  )

  if (!file.content) {
    throw new Error(`${path} has no content`)
  }

  return {
    id,
    path,
    page: JSON.parse(decodeBase64(file.content)) as SchemaPage,
    sha: file.sha
  }
}

/**
 * List every page the editing tools can change, cached against the head commit.
 *
 * @param {ContentEnv} env
 * @return {Promise<ContentPageSummary[]>}
 */
const listPages = async (env: ContentEnv): Promise<ContentPageSummary[]> => {
  const baseSha = await getBaseSha(env)
  const cacheKey = `pages:${baseSha}`
  const cached = await env.CONTENT_KV.get(cacheKey)

  if (cached) {
    return JSON.parse(cached) as ContentPageSummary[]
  }

  const files = await githubFetch<ContentGithubContent[]>(
    env,
    `${getRepoPath(env)}/contents/${contentDir}?ref=${env.GITHUB_BASE}`
  )

  const ids = files
    .filter(file => file.type === 'file' && file.name.endsWith('.json'))
    .map(file => file.name.replace(/\.json$/, ''))
    .filter(id => {
      const type = id.split('--')[0]

      return !!type && contentTypes.includes(type)
    })

  const pages = await Promise.all(ids.map(async id => {
    const { page } = await readPage(env, id, env.GITHUB_BASE)

    return {
      id,
      slug: page.slug,
      contentType: page.contentType,
      title: page.title
    }
  }))

  pages.sort((a, b) => a.id.localeCompare(b.id))

  await env.CONTENT_KV.put(cacheKey, JSON.stringify(pages), { expirationTtl: 86400 })

  return pages
}

/**
 * Find the open pull request for a page, if there is one.
 *
 * @param {ContentEnv} env
 * @param {string} id
 * @return {Promise<ContentGithubPull|undefined>}
 */
const getOpenPull = async (
  env: ContentEnv,
  id: string
): Promise<ContentGithubPull | undefined> => {
  const branch = getContentBranch(id)
  const pulls = await githubFetch<ContentGithubPull[]>(
    env,
    `${getRepoPath(env)}/pulls?state=open&head=${env.GITHUB_OWNER}:${branch}`
  )

  return pulls[0]
}

/**
 * Point a branch at a commit, creating it if it does not exist.
 *
 * @param {ContentEnv} env
 * @param {string} branch
 * @param {string} sha
 * @return {Promise<void>}
 */
const setBranch = async (env: ContentEnv, branch: string, sha: string): Promise<void> => {
  const res = await githubRequest(env, `${getRepoPath(env)}/git/refs`, {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha })
  })

  if (res.ok || res.status === 422) { // 422 means the branch is already there
    return
  }

  throw new Error(`Could not create branch ${branch} (${res.status}): ${await res.text()}`)
}

/**
 * Delete a branch, ignoring one that has already gone.
 *
 * @param {ContentEnv} env
 * @param {string} branch
 * @return {Promise<void>}
 */
const deleteBranch = async (env: ContentEnv, branch: string): Promise<void> => {
  await githubRequest(env, `${getRepoPath(env)}/git/refs/heads/${branch}`, {
    method: 'DELETE'
  })
}

/**
 * Commit a file to a branch, authored by the editor and committed by the app.
 *
 * @param {ContentEnv} env
 * @param {object} args
 * @return {Promise<string>}
 */
const commitFile = async (
  env: ContentEnv,
  args: {
    path: string
    contents: string
    message: string
    branch: string
    sha?: string
    actor: ContentProps
  }
): Promise<string> => {
  const { path, contents, message, branch, sha, actor } = args
  const commit = await githubFetch<{ content: { sha: string } }>(
    env,
    `${getRepoPath(env)}/contents/${path}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message,
        content: encodeBase64(contents),
        branch,
        sha,
        author: {
          name: actor.name,
          email: actor.email
        },
        committer: {
          name: env.CONTENT_BOT_NAME,
          email: env.CONTENT_BOT_EMAIL
        }
      })
    }
  )

  return commit.content.sha
}

/**
 * Open a pull request.
 *
 * @param {ContentEnv} env
 * @param {object} args
 * @return {Promise<ContentGithubPull>}
 */
const createPull = async (
  env: ContentEnv,
  args: { branch: string, title: string, body: string }
): Promise<ContentGithubPull> => {
  return await githubFetch<ContentGithubPull>(env, `${getRepoPath(env)}/pulls`, {
    method: 'POST',
    body: JSON.stringify({
      title: args.title,
      body: args.body,
      head: args.branch,
      base: env.GITHUB_BASE
    })
  })
}

/**
 * Squash merge a pull request.
 *
 * @param {ContentEnv} env
 * @param {number} number
 * @param {string} title
 * @return {Promise<void>}
 * @throws {Error} When the merge is refused, most often by branch protection.
 */
const mergePull = async (env: ContentEnv, number: number, title: string): Promise<void> => {
  const res = await githubRequest(env, `${getRepoPath(env)}/pulls/${number}/merge`, {
    method: 'PUT',
    body: JSON.stringify({
      merge_method: 'squash',
      commit_title: title
    })
  })

  if (res.ok) {
    return
  }

  const detail = await res.text()

  if (res.status === 405) {
    throw new Error(
      `GitHub refused to merge this change: ${detail}. If the base branch requires a review, the ruleset needs to allow the content app to bypass it — the app cannot approve its own pull request.`
    )
  }

  throw new Error(`Could not merge pull request ${number} (${res.status}): ${detail}`)
}

/**
 * Close a pull request without merging it.
 *
 * @param {ContentEnv} env
 * @param {number} number
 * @return {Promise<void>}
 */
const closePull = async (env: ContentEnv, number: number): Promise<void> => {
  await githubFetch(env, `${getRepoPath(env)}/pulls/${number}`, {
    method: 'PATCH',
    body: JSON.stringify({ state: 'closed' })
  })
}

/**
 * Check runs for a commit.
 *
 * @param {ContentEnv} env
 * @param {string} sha
 * @return {Promise<ContentGithubCheck[]>}
 */
const getChecks = async (env: ContentEnv, sha: string): Promise<ContentGithubCheck[]> => {
  const res = await githubFetch<{ check_runs: ContentGithubCheck[] }>(
    env,
    `${getRepoPath(env)}/commits/${sha}/check-runs`
  )

  return res.check_runs
}

export {
  contentDir,
  contentTypes,
  encodeBase64,
  decodeBase64,
  githubRequest,
  githubFetch,
  getContentPath,
  getContentBranch,
  getRepoPath,
  serializePage,
  getBaseSha,
  readPage,
  listPages,
  getOpenPull,
  setBranch,
  deleteBranch,
  commitFile,
  createPull,
  mergePull,
  closePull,
  getChecks
}
