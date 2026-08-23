/**
 * Workers - Content Mcp
 */

/* Imports */

import type { ContentEnv, ContentProps, ContentPreview } from './ContentTypes.js'
import type { SchemaPage } from '../../schema/schemaTypes.js'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import { pageSchema } from '../../global/globalTypes.js'
import { parsePage, getSchemaIssuesMessage } from '../../schema/schemaParse.js'
import { getPageDiff } from './ContentDiff.js'
import { listImages } from './ContentImage.js'
import {
  getBaseSha,
  getContentBranch,
  getContentPath,
  getOpenPull,
  setBranch,
  deleteBranch,
  commitFile,
  createPull,
  mergePull,
  closePull,
  getChecks,
  listPages,
  readPage,
  serializePage
} from './ContentGithub.js'

/**
 * Identifier of a content file, as used throughout the site to reference one
 * page from another.
 *
 * @type {z.ZodString}
 */
const slugArg = z
  .string()
  .regex(/^[a-z][a-zA-Z]*--[a-z0-9-]+$/, 'Must be a page id such as page--about or work--citris')
  .describe('Which page, as contentType--slug — for example page--about or work--citris. Use list_pages to find it.')

/**
 * Wrap a tool result as text.
 *
 * @param {string} text
 * @return {object}
 */
const toolText = (text: string) => ({
  content: [{ type: 'text' as const, text }]
})

/**
 * Wrap a tool failure as text, so the editor sees what went wrong.
 *
 * @param {unknown} error
 * @return {object}
 */
const toolError = (error: unknown) => ({
  content: [{
    type: 'text' as const,
    text: error instanceof Error ? error.message : String(error)
  }],
  isError: true
})

/**
 * Read a page as it stands on the published branch, if it is there at all.
 *
 * @param {ContentEnv} env
 * @param {string} id
 * @return {Promise<SchemaPage|undefined>}
 */
const getPublishedPage = async (
  env: ContentEnv,
  id: string
): Promise<SchemaPage | undefined> => {
  try {
    const { page } = await readPage(env, id, env.GITHUB_BASE)

    return page
  } catch {
    return undefined
  }
}

/**
 * Where the page ends up on the site.
 *
 * @param {SchemaPage} page
 * @return {string}
 */
// Mirrors typeInSlug in the site config — the worker stands apart from the
// build, so the two have to be kept in step by hand
const getPagePath = (page: SchemaPage): string => {
  if (page.contentType === 'work') {
    return `/work/${page.slug}/`
  }

  return page.slug === 'index' ? '/' : `/${page.slug}/`
}

/**
 * Where the preview of a staged page lives.
 *
 * @param {ContentEnv} env
 * @param {number} number
 * @param {SchemaPage} page
 * @return {string|undefined}
 */
// The preview workflow aliases every version of a pull request to pr-<number>,
// so the URL is known before the build that fills it has finished
const getPreviewUrl = (
  env: ContentEnv,
  number: number,
  page: SchemaPage
): string | undefined => {
  if (!env.CONTENT_PREVIEW_HOST) {
    return undefined
  }

  return `https://pr-${number}-${env.CONTENT_PREVIEW_HOST}${getPagePath(page)}`
}

/**
 * State of the preview build for a staged page.
 *
 * @param {ContentEnv} env
 * @param {string} id
 * @return {Promise<ContentPreview>}
 */
const getPreview = async (env: ContentEnv, id: string): Promise<ContentPreview> => {
  const pull = await getOpenPull(env, id)

  if (!pull) {
    return {
      status: 'none',
      detail: 'Nothing is staged for this page.'
    }
  }

  // The staged page rather than the published one, as an edit can move the
  // page to a different URL
  const { page } = await readPage(env, id, pull.head.ref)
  const url = getPreviewUrl(env, pull.number, page)
  const checks = await getChecks(env, pull.head.sha)
  const preview = checks.filter(check => check.name.toLowerCase().includes('preview'))

  if (!preview.length) {
    return {
      status: 'building',
      url,
      detail: 'The preview build has not started yet.'
    }
  }

  if (preview.some(check => check.status !== 'completed')) {
    return {
      status: 'building',
      url
    }
  }

  const failed = preview.find(check => check.conclusion !== 'success')

  if (failed) {
    return {
      status: 'failed',
      url: failed.details_url ?? url,
      detail: failed.output?.summary ?? 'The preview build failed.'
    }
  }

  return {
    status: 'ready',
    url
  }
}

/**
 * Register the editing tools on an MCP server.
 *
 * @param {ContentEnv} env
 * @param {ContentProps} actor
 * @return {McpServer}
 */
const getMcpServer = (env: ContentEnv, actor: ContentProps): McpServer => {
  const server = new McpServer({
    name: 'alaniz-creative-content',
    version: '1.0.0'
  }, {
    instructions: [
      'Edit the pages of alanizcreative.com.',
      '',
      'Read a page before changing it, and send the whole page back to stage_page —',
      'it replaces the file rather than merging into it.',
      '',
      'Staging opens a pull request with a preview. Poll check_preview until it is',
      'ready, show the editor the diff and the preview link, and only call publish',
      'once they have said yes. Nothing goes live before that.',
      '',
      'Images cannot be attached here. Point the editor at the media library to',
      'upload one, then reference it by its key.'
    ].join('\n')
  })

  /* Read */

  server.registerTool('list_pages', {
    description: 'List every page that can be edited.',
    inputSchema: {}
  }, async () => {
    try {
      const pages = await listPages(env)
      const lines = pages.map(page => `${page.id} — ${page.title}`)

      return toolText(`${pages.length} pages:\n${lines.join('\n')}`)
    } catch (error) {
      return toolError(error)
    }
  })

  server.registerTool('read_page', {
    description: 'Read a page as it is published. Always read before editing.',
    inputSchema: {
      slug: slugArg
    }
  }, async ({ slug }) => {
    try {
      const { page } = await readPage(env, slug, env.GITHUB_BASE)
      const staged = await getOpenPull(env, slug)
      const note = staged
        ? `\n\nThis page already has a staged change open at ${staged.html_url}. Editing it again will update that change.`
        : ''

      return toolText(`${serializePage(page)}${note}`)
    } catch (error) {
      return toolError(error)
    }
  })

  server.registerTool('list_images', {
    description: 'List the images in the media library, with the key each one is referenced by.',
    inputSchema: {
      prefix: z
        .string()
        .optional()
        .describe('Only list keys starting with this, for example citris/.')
    }
  }, async ({ prefix }) => {
    try {
      const images = await listImages(env, prefix)

      if (!images.length) {
        return toolText('The media library is empty. Upload an image before referencing one.')
      }

      const lines = images.map(image => `${image.key} — ${image.width}×${image.height}`)

      return toolText(`${images.length} images:\n${lines.join('\n')}`)
    } catch (error) {
      return toolError(error)
    }
  })

  /* Write */

  server.registerTool('stage_page', {
    description: [
      'Stage a change to a page. Send the whole page, not just the parts that changed.',
      'This validates the page, commits it to its own branch and opens a pull request',
      'with a preview. Nothing is published until publish is called.'
    ].join(' '),
    inputSchema: {
      slug: slugArg,
      page: pageSchema.describe('The complete page, as it should end up.'),
      summary: z
        .string()
        .min(1)
        .max(60)
        .describe('What this edit does, lowercase and in a few words — for example swap the hero image or rewrite the intro. Becomes the commit message.')
    }
  }, async ({ slug, page, summary }) => {
    try {
      /* Validate before anything is written */

      const { valid, page: parsed, issues } = parsePage(page)

      if (!valid || !parsed) {
        return toolError(new Error(`That page is not valid, so nothing was staged:\n${getSchemaIssuesMessage(issues)}`))
      }

      if (parsed.contentType !== slug.split('--')[0]) {
        return toolError(new Error(`${slug} is a ${slug.split('--')[0]} but the page says it is a ${parsed.contentType}.`))
      }

      const staged = { ...parsed, dateModified: new Date().toISOString().replace(/\.\d+Z$/, '') }
      const published = await getPublishedPage(env, slug)
      const diff = getPageDiff(published, staged)

      if (diff === 'Nothing changed.') {
        return toolText('That page is already exactly like this, so nothing was staged.')
      }

      /* Branch, then commit onto it */

      const branch = getContentBranch(slug)

      await setBranch(env, branch, await getBaseSha(env))

      let sha: string | undefined

      try {
        sha = (await readPage(env, slug, branch)).sha
      } catch {
        sha = undefined // The page is new
      }

      await commitFile(env, {
        path: getContentPath(slug),
        contents: serializePage(staged),
        message: `content: ${summary}`,
        branch,
        sha,
        actor
      })

      /* One open pull request per page — staging twice updates it */

      const existing = await getOpenPull(env, slug)
      const pull = existing ?? await createPull(env, {
        branch,
        title: `content: update ${parsed.title.toLowerCase()}`,
        body: `Requested by ${actor.email} through the content connector.`
      })

      // The URL is the same for every version of a pull request, so until this
      // version has been uploaded it still shows whatever was staged before
      const url = getPreviewUrl(env, pull.number, staged)

      return toolText([
        `Staged as pull request #${pull.number}.`,
        '',
        diff,
        '',
        url ? `Preview, once it has built: ${url}` : '',
        'The preview takes a minute or two — check_preview will say when it is ready.'
      ].filter(Boolean).join('\n'))
    } catch (error) {
      return toolError(error)
    }
  })

  server.registerTool('check_preview', {
    description: 'Check whether the preview of a staged page has finished building.',
    inputSchema: {
      slug: slugArg
    }
  }, async ({ slug }) => {
    try {
      const { status, url, detail } = await getPreview(env, slug)

      if (status === 'none') {
        return toolText(detail ?? 'Nothing is staged for this page.')
      }

      if (status === 'building') {
        return toolText(`Still building. ${detail ?? 'Check again in about thirty seconds.'}`)
      }

      if (status === 'failed') {
        return toolText(`The preview build failed: ${detail ?? 'no detail given'}\n${url ?? ''}`)
      }

      return toolText(url ? `Ready at ${url}` : 'Ready — the preview has finished building.')
    } catch (error) {
      return toolError(error)
    }
  })

  server.registerTool('publish', {
    description: 'Publish a staged page. Only call this once the editor has looked at the preview and said yes.',
    inputSchema: {
      slug: slugArg
    }
  }, async ({ slug }) => {
    try {
      const pull = await getOpenPull(env, slug)

      if (!pull) {
        return toolError(new Error(`Nothing is staged for ${slug}.`))
      }

      await mergePull(env, pull.number, `content: update ${slug}`)
      await deleteBranch(env, pull.head.ref)

      return toolText('Published. The site rebuilds and goes live in a few minutes.')
    } catch (error) {
      return toolError(error)
    }
  })

  server.registerTool('discard', {
    description: 'Throw away a staged change without publishing it.',
    inputSchema: {
      slug: slugArg
    }
  }, async ({ slug }) => {
    try {
      const pull = await getOpenPull(env, slug)

      if (!pull) {
        return toolText(`Nothing is staged for ${slug}.`)
      }

      await closePull(env, pull.number)
      await deleteBranch(env, pull.head.ref)

      return toolText(`Discarded. ${slug} is back to what is published.`)
    } catch (error) {
      return toolError(error)
    }
  })

  return server
}

/* Exports */

export { getMcpServer }
