/**
 * Setup - Dev
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { getLocalData } from '@alanizcreative/formation-static/local/localData.js'
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { getImageMeta } from '../store/storeImages.js'
import { validateContent } from '../schema/schemaValidate.js'
import { config } from '../config/config.js'
import { localDataArgs } from './setupData.js'

/**
 * Write JSON file, creating its directory if needed.
 *
 * @param {string} outFile
 * @param {unknown} data
 * @return {Promise<void>}
 */
const writeJson = async (outFile: string, data: unknown): Promise<void> => {
  await mkdir(resolve(outFile, '..'), { recursive: true })
  await writeFile(resolve(outFile), JSON.stringify(data))
}

/**
 * Validate data files and write them with image metadata as one file the dev worker imports.
 *
 * @return {Promise<void>}
 */
const setupDev = async (): Promise<void> => {
  const imageMeta = await getImageMeta()

  setStoreItem('imageMeta', imageMeta) // Resolves images in data

  await validateContent(config.local.dir)

  const data = await getLocalData({ key: 'all_file_data', ...localDataArgs })

  await writeJson('lib/dev/data.json', { data, imageMeta })

  print('[AC] Wrote local data', `${Object.keys(data).length} files`, 'success')
}

await setupDev() // Throws exit non-zero so wrangler sees a failed build
