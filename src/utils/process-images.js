/**
 * Utils - process images
 */

/* Imports */

const sharp = require('sharp')
const { readdir, mkdir, writeFile } = require('node:fs/promises')
const { extname, join, dirname } = require('node:path')
const { existsSync } = require('node:fs')

/**
 * Function - get and save image data and output multiple sizes
 *
 * @param {string} inputDir
 * @param {string} outputDir
 * @param {string} savePath
 * @return {void}
 */

const processImages = async (inputDir = '', outputDir = '', savePath = '') => {
  const store = {}

  const create = async ({ size, width, path, name }) => {
    const newPath = `./${outputDir}/${name}${size !== width ? `@${size}` : ''}.webp`

    return await sharp(`./${path}`)
      .webp({ quality: 75 })
      .resize(size)
      .toFile(newPath)
  }

  const recurse = async function* (dir) {
    const files = await readdir(dir, { withFileTypes: true })

    for (const file of files) {
      if (file.isDirectory()) {
        yield* await recurse(join(dir, file.name));
      } else {
        yield join(dir, file.name)
      }
    }
  }

  try {
    if (!inputDir || !outputDir) {
      throw new Error('No input or output directories')
    }

    for await (const path of recurse(`./${inputDir}`)) {
      if (path.includes('.DS_Store')) {
        continue
      }
  
      const ext = extname(path)
      const relPath = path.split(`${inputDir}/`)[1]
      const base = relPath.split(`${ext}`)[0]
      const folder = dirname(`./${outputDir}/${base}`)
  
      const metadata = await sharp(path).metadata()
      const { width, height } = metadata
      store[base] = { width, height }
  
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

module.exports = processImages