/**
 * Store - Images
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Where the content worker serves image metadata, overridable per build.
 *
 * @type {string}
 */
const imageMetaUrl: string = 'https://content.alanizcreative.com/images.json'

/**
 * Read the metadata of every image the site can reference.
 *
 * @return {Promise<StoreImageMeta>}
 * @throws {Error}
 */
const getImageMeta = async (): Promise<Store['imageMeta']> => {
  const url = process.env.IMAGE_META_URL ?? imageMetaUrl
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Could not fetch image metadata from ${url} (${res.status})`)
  }

  return await res.json() as Store['imageMeta']
}

/* Exports */

export {
  imageMetaUrl,
  getImageMeta
}
