/**
 * Workers - Content Image
 */

/* Imports */

import type {
  ContentEnv,
  ContentProps,
  ContentImage,
  ContentImageMeta
} from './ContentTypes.js'
import {
  listPages,
  readPage
} from './ContentGithub.js'

/**
 * Key the image metadata is stored under.
 *
 * @type {string}
 */
const imageMetaKey: string = 'images:meta'

/**
 * Largest upload accepted.
 *
 * @type {number}
 */
const imageMaxSize: number = 20 * 1024 * 1024

/**
 * Formats the media library accepts, mapped to the extension they are stored
 * under.
 *
 * @type {Object<string, string>}
 */
const imageFormats: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif'
}

/**
 * Turn a file name into a media library key.
 *
 * @param {string} value
 * @return {string}
 */
const getImageKey = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, '')
    .replace(/[^a-z0-9/-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-/]+|[-/]+$/g, '')
}

/**
 * Read the image metadata as stored.
 *
 * @param {ContentEnv} env
 * @return {Promise<string>}
 */
const getImageMetaJson = async (env: ContentEnv): Promise<string> => {
  return await env.CONTENT_KV.get(imageMetaKey) ?? '{}'
}

/**
 * Read the image metadata.
 *
 * @param {ContentEnv} env
 * @return {Promise<ContentImageMeta>}
 */
const getImageMeta = async (env: ContentEnv): Promise<ContentImageMeta> => {
  return JSON.parse(await getImageMetaJson(env)) as ContentImageMeta
}

/**
 * Replace the image metadata, sorted and indented for reading.
 *
 * @param {ContentEnv} env
 * @param {ContentImageMeta} meta
 * @return {Promise<void>}
 */
const putImageMeta = async (env: ContentEnv, meta: ContentImageMeta): Promise<void> => {
  const sorted = Object.fromEntries(
    Object.entries(meta).sort(([a], [b]) => a.localeCompare(b))
  )

  await env.CONTENT_KV.put(imageMetaKey, `${JSON.stringify(sorted, null, 2)}\n`)
}

/**
 * List the media library, newest metadata first.
 *
 * @param {ContentEnv} env
 * @param {string} [prefix]
 * @return {Promise<ContentImage[]>}
 */
const listImages = async (env: ContentEnv, prefix?: string): Promise<ContentImage[]> => {
  const meta = await getImageMeta(env)

  return Object.entries(meta)
    .filter(([key]) => !prefix || key.startsWith(prefix))
    .map(([key, value]) => ({ key, ...value }))
    .sort((a, b) => a.key.localeCompare(b.key))
}

/**
 * Find the content files that use an image.
 *
 * @param {ContentEnv} env
 * @param {string} key
 * @return {Promise<string[]>}
 */
const getImageUses = async (env: ContentEnv, key: string): Promise<string[]> => {
  const pages = await listPages(env)
  const uses = await Promise.all(pages.map(async ({ id }) => {
    const { page } = await readPage(env, id, env.GITHUB_BASE)
    const used = JSON.stringify(page).includes(`"${key}"`)

    return used ? id : ''
  }))

  return uses.filter(Boolean)
}

/**
 * Store an image and record what the build needs to know about it.
 *
 * @param {ContentEnv} env
 * @param {object} args
 * @return {Promise<ContentImage>}
 * @throws {Error} When the file is not a supported image, or is too large.
 */
const putImage = async (
  env: ContentEnv,
  args: {
    file: File
    key?: string
    alt: string
    actor: ContentProps
  }
): Promise<ContentImage> => {
  const { file, alt, actor } = args
  const type = file.type
  const format = imageFormats[type]

  if (!format) {
    throw new Error(`${type || 'That file'} is not an image the library accepts — use a JPEG, PNG, WebP or GIF.`)
  }

  if (file.size > imageMaxSize) {
    throw new Error(`That image is ${Math.round(file.size / 1024 / 1024)} MB, over the ${imageMaxSize / 1024 / 1024} MB limit.`)
  }

  const images = env.IMAGES

  if (!images) {
    throw new Error('The images binding is not configured, so uploads cannot be measured or resized.')
  }

  const key = getImageKey(args.key || file.name)

  if (!key) {
    throw new Error('That file name does not make a usable key. Give the image a name.')
  }

  /* Measure only — the file worker resizes on the way out */

  const info = await images.info(file.stream() as ReadableStream<Uint8Array>)

  if (!('width' in info)) {
    throw new Error('That file is not an image the library can measure.')
  }

  const bytes = await file.arrayBuffer()
  const { width, height } = info

  /* Bytes first — metadata with no object is a broken image on a live page */

  const path = `${key}.${format}`

  await env.ASSETS_BUCKET.put(path, bytes, {
    httpMetadata: {
      contentType: type,
      cacheControl: 'public, max-age=31536000, immutable'
    },
    customMetadata: {
      alt,
      uploadedBy: actor.email
    }
  })

  const entry = {
    path,
    name: key.split('/').pop() ?? key,
    type,
    format,
    width,
    height,
    size: bytes.byteLength
  }

  const meta = await getImageMeta(env)

  meta[key] = entry

  await putImageMeta(env, meta)

  return { key, ...entry }
}

/**
 * Remove an image, refusing while a page still points at it.
 *
 * @param {ContentEnv} env
 * @param {string} key
 * @return {Promise<void>}
 * @throws {Error} When the image is still in use.
 */
const deleteImage = async (env: ContentEnv, key: string): Promise<void> => {
  const uses = await getImageUses(env, key)

  if (uses.length) {
    throw new Error(`${key} is still used by ${uses.join(', ')}. Take it off those pages first.`)
  }

  const meta = await getImageMeta(env)
  const entry = meta[key]

  if (!entry) {
    throw new Error(`${key} is not in the media library.`)
  }

  /* Metadata first — the build stops referencing it before the bytes go */

  const rest = Object.fromEntries(
    Object.entries(meta).filter(([existing]) => existing !== key)
  )

  await putImageMeta(env, rest)
  await env.ASSETS_BUCKET.delete(entry.path)
}

/* Exports */

export {
  imageMetaKey,
  imageMaxSize,
  imageFormats,
  getImageKey,
  getImageMetaJson,
  getImageMeta,
  putImageMeta,
  listImages,
  getImageUses,
  putImage,
  deleteImage
}
