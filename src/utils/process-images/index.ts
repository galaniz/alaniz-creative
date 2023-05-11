/**
 * Utils - process images
 */

/* Imports */

import sharp from 'sharp'
import { mkdir, writeFile } from 'node:fs/promises'
import { extname, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import getAllFilePaths from '../get-all-file-paths'

/**
 * Function - get and save image data and output multiple sizes
 *
 * @param {string} inputDir
 * @param {string} outputDir
 * @param {string} savePath
 * @return {void}
 */

const processImages = async (
  inputDir: string = '',
  outputDir: string = '',
  savePath: string = ''
): Promise<void> => {
  const store = {}

  const create = async ({ size, width, path, name }) => {
    const newPath = `./${outputDir}/${name}${size !== width ? `@${size}` : ''}.webp`

    return await sharp(`./${path}`)
      .webp({ quality: 75 })
      .resize(size)
      .toFile(newPath)
  }

  try {
    if (!inputDir || !outputDir) {
      throw new Error('No input or output directories')
    }

    for await (const path of getAllFilePaths(`./${inputDir}`)) {
      if (path.includes('.DS_Store')) {
        continue
      }
  
      const ext = extname(path)
      const relPath = path.split(`${inputDir}/`)[1]
      const base = relPath.split(`${ext}`)[0]
      const folder = dirname(`./${outputDir}/${base}`)
  
      const metadata = await sharp(path).metadata()
      const { width = 0, height } = metadata
      store[base] = { base, width, height }
  
      let sizes = [200, 400, 600, 800, 1200, 1600, 2000, width]
      sizes = sizes.filter(s => s <= width)
  
      if (!existsSync(folder)) {
        await mkdir(folder, { recursive: true })
      }
  
      await Promise.all(
        sizes.map(async (size) => {
          return await create({ size, width, path, name: base })
        })
      )
    }

    if (savePath) {
      await writeFile(`./${savePath}`, JSON.stringify(store))
    }
  } catch (error) {
    console.error('Error processing images: ', error)
  }
}

/* Exports */

export default processImages
