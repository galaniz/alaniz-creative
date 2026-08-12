/**
 * Store - Images
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

/**
 * Where image metadata lives.
 *
 * Kept as data rather than as part of the store module so the media library
 * can add to it. The bytes of an image live in object storage, but the build
 * needs its dimensions to reserve the right space and pick the right size, and
 * that has to be in the repo.
 *
 * @type {string}
 */
const imageMetaFile: string = 'media/imageMeta.json'

/**
 * Read the metadata of every image the site can reference.
 *
 * @return {Promise<Store['imageMeta']>}
 */
const getImageMeta = async (): Promise<Store['imageMeta']> => {
  const contents = await readFile(resolve(imageMetaFile), { encoding: 'utf8' })

  return JSON.parse(contents) as Store['imageMeta']
}

/* Exports */

export {
  imageMetaFile,
  getImageMeta
}
