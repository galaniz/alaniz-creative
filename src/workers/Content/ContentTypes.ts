/**
 * Workers - Content Types
 */

import type { OAuthHelpers } from '@cloudflare/workers-oauth-provider'
import type { SchemaPage } from '../../schema/schemaTypes.js'

/**
 * @typedef {object} ContentEnv
 * @prop {KVNamespace} OAUTH_KV
 * @prop {KVNamespace} CONTENT_KV
 * @prop {R2Bucket} ASSETS_BUCKET
 * @prop {ImagesBinding} [IMAGES]
 * @prop {OAuthHelpers} OAUTH_PROVIDER
 * @prop {string} GITHUB_APP_ID
 * @prop {string} GITHUB_APP_PRIVATE_KEY
 * @prop {string} GITHUB_INSTALLATION_ID
 * @prop {string} GITHUB_OWNER
 * @prop {string} GITHUB_REPO
 * @prop {string} GITHUB_BASE
 * @prop {string} CF_ACCESS_TEAM_DOMAIN
 * @prop {string} CF_ACCESS_AUD
 * @prop {string} CONTENT_BOT_NAME
 * @prop {string} CONTENT_BOT_EMAIL
 * @prop {string} CONTENT_ASSETS_URL
 * @prop {string} CONTENT_PREVIEW_HOST
 */
export interface ContentEnv {
  OAUTH_KV: KVNamespace
  CONTENT_KV: KVNamespace
  ASSETS_BUCKET: R2Bucket
  IMAGES?: ImagesBinding
  OAUTH_PROVIDER: OAuthHelpers
  GITHUB_APP_ID: string
  GITHUB_APP_PRIVATE_KEY: string
  GITHUB_INSTALLATION_ID: string
  GITHUB_OWNER: string
  GITHUB_REPO: string
  GITHUB_BASE: string
  CF_ACCESS_TEAM_DOMAIN: string
  CF_ACCESS_AUD: string
  CONTENT_BOT_NAME: string
  CONTENT_BOT_EMAIL: string
  CONTENT_ASSETS_URL: string
  CONTENT_PREVIEW_HOST: string
}

/**
 * The authenticated editor, carried on the OAuth grant.
 *
 * @typedef {object} ContentProps
 * @prop {string} email
 * @prop {string} name
 */
export interface ContentProps {
  email: string
  name: string
}

/**
 * A content file as it exists on a branch.
 *
 * @typedef {object} ContentPageFile
 * @prop {string} id
 * @prop {string} path
 * @prop {SchemaPage} page
 * @prop {string} sha
 */
export interface ContentPageFile {
  id: string
  path: string
  page: SchemaPage
  sha: string
}

/**
 * A content file as it appears in a listing.
 *
 * @typedef {object} ContentPageSummary
 * @prop {string} id
 * @prop {string} slug
 * @prop {string} contentType
 * @prop {string} title
 */
export interface ContentPageSummary {
  id: string
  slug: string
  contentType: string
  title: string
}

/**
 * An entry in the media library.
 *
 * @typedef {object} ContentImage
 * @prop {string} key
 * @prop {string} path
 * @prop {string} name
 * @prop {string} type
 * @prop {string} format
 * @prop {number} width
 * @prop {number} height
 * @prop {number} size
 * @prop {string} [alt]
 */
export interface ContentImage {
  key: string
  path: string
  name: string
  type: string
  format: string
  width: number
  height: number
  size: number
  alt?: string
}

/**
 * @typedef {Object<string, ContentImage>} ContentImageMeta
 */
export type ContentImageMeta = Record<string, Omit<ContentImage, 'key'>>

/**
 * The staged state of a page — an open pull request and where to look at it.
 *
 * @typedef {object} ContentStaged
 * @prop {number} number
 * @prop {string} branch
 * @prop {string} url
 */
export interface ContentStaged {
  number: number
  branch: string
  url: string
}

/**
 * @typedef {'building'|'ready'|'failed'|'none'} ContentPreviewStatus
 */
export type ContentPreviewStatus = 'building' | 'ready' | 'failed' | 'none'

/**
 * @typedef {object} ContentPreview
 * @prop {ContentPreviewStatus} status
 * @prop {string} [url]
 * @prop {string} [detail]
 */
export interface ContentPreview {
  status: ContentPreviewStatus
  url?: string
  detail?: string
}

/**
 * @typedef {object} ContentGithubContent
 * @prop {string} name
 * @prop {string} path
 * @prop {string} sha
 * @prop {string} type
 * @prop {string} [content]
 * @prop {string} [encoding]
 */
export interface ContentGithubContent {
  name: string
  path: string
  sha: string
  type: string
  content?: string
  encoding?: string
}

/**
 * @typedef {object} ContentGithubPull
 * @prop {number} number
 * @prop {string} html_url
 * @prop {object} head
 */
export interface ContentGithubPull {
  number: number
  html_url: string
  head: {
    ref: string
    sha: string
  }
}

/**
 * @typedef {object} ContentGithubCheck
 * @prop {string} name
 * @prop {string} status
 * @prop {string|null} conclusion
 * @prop {string|null} details_url
 * @prop {object} [output]
 */
export interface ContentGithubCheck {
  name: string
  status: string
  conclusion: string | null
  details_url: string | null
  output?: {
    summary?: string | null
  }
}
