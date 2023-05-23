/**
 * 11ty config
 */

/* Imports */

import * as dotenv from 'dotenv'
dotenv.config()
import htmlmin from 'html-minifier'
import esbuild from 'esbuild'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import postcssPresetEnv from 'postcss-preset-env'
import { sassPlugin } from 'esbuild-sass-plugin'
import { writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { envData, jsonFileData } from './src/vars/data'
import processImages from './src/utils/process-images'
import getAllFilePaths from './src/utils/get-all-file-paths'

/* Config */

module.exports = (config: any) => {
  /* Add env variables */

  if (process) {
    const env = process.env

    envData.eleventy.cache = env?.USE_11TY_CACHE ? true : false
    envData.dev = env.ENVIRONMENT === 'dev'
    envData.prod = env.ENVIRONMENT === 'production'
  }

  /* Process images and check/build json files */

  config.on('eleventy.before', async ({ runMode }) => {
    if (runMode === 'build') {
      const jsonFiles = Object.keys(jsonFileData)

      for (const j of jsonFiles) {
        const path = `./src/json/${jsonFileData[j].name}`

        if (!existsSync(path)) {
          await writeFile(path, JSON.stringify({}))
        }
      }

      const imageDataPath = './src/json/image-data.json'

      if (!existsSync(imageDataPath)) {
        await writeFile(imageDataPath, JSON.stringify({}))
      }

      await processImages('src/assets/img', 'site/assets/img', 'src/json/image-data.json')
    }
  })

  /* Process scss and js files */

  config.on('eleventy.after', async () => {
    const entryPoints = {}
    const namespace = 'ac'

    entryPoints[`js/${namespace}`] = 'src/assets/index.js'
    entryPoints[`css/${namespace}`] = 'src/assets/index.scss'

    return await esbuild.build({
      entryPoints,
      outdir: 'site/assets',
      minify: true,
      bundle: true,
      sourcemap: false,
      target: 'es6',
      external: ['*.woff', '*.woff2'],
      plugins: [sassPlugin({
        async transform (source) {
          const { css } = await postcss(
            [
              autoprefixer,
              postcssPresetEnv({
                stage: 4
              })
            ]
          ).process(
            source,
            {
              from: `css/${namespace}.css`
            }
          )
  
          return css
        }
      })]
    })
  })

  config.addWatchTarget('./src/assets/')

  /* Ignore gitignore */

  config.setUseGitIgnore(false)

  /* Delete render from cache on watch */

  config.on('eleventy.beforeWatch', async () => {
    for await (const path of getAllFilePaths('./src/render/')) {
      delete require.cache[resolve(path)]
    }

    for await (const path of getAllFilePaths('./src/utils/')) {
      delete require.cache[resolve(path)]
    }

    for await (const path of getAllFilePaths('./src/vars/')) {
      delete require.cache[resolve(path)]
    }
  })

  /* Minify HTML */

  config.addTransform('htmlmin', (content: string, outputPath: string) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })

      return minified
    }

    return content
  })

  /* Copy static asset folders */

  config.addPassthroughCopy({
    'src/assets/video': 'assets/video'
  })

  config.addPassthroughCopy({
    'src/assets/fonts': 'assets/fonts'
  })

  config.addPassthroughCopy({
    'src/assets/favicon': 'assets/favicon'
  })

  /* Folder structure */

  return {
    dir: {
      data: 'data',
      output: 'site'
    }
  }
}
