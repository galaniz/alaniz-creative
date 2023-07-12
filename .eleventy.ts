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
import { resolve, extname } from 'node:path'
import getAllFilePaths from '@alanizcreative/static-site-formation/src/utils/get-all-file-paths'
import config from './src/config'

/* Config */

module.exports = (args: any) => {
  /* Add env variables */

  if (process) {
    const env = process.env

    config.dev = env.ENVIRONMENT === 'dev'
    config.prod = env.ENVIRONMENT === 'production'
  }
  
  /* Process scss and js files */

  args.on('eleventy.before', async () => {
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

  args.addWatchTarget('./src/assets/')

  /* Ignore gitignore */

  args.setUseGitIgnore(false)

  /* Delete render from cache on watch */

  args.on('eleventy.beforeWatch', async () => {
    const folders = [
      './src/components/',
      './src/config/',
      './src/filters/',
      './src/layouts/',
      './src/objects/',
      './src/serverless/',
      './src/svg/',
    ]

    for (let i = 0; i < folders.length; i += 1) {
      for await (const path of getAllFilePaths(folders[i])) {
        const ext = extname(path)

        if (ext === '.js') {
          delete require.cache[resolve(path)]
        }
      }
    }
  })

  /* Minify HTML */

  args.addTransform('htmlmin', (content: string, outputPath: string) => {
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

  args.addPassthroughCopy({
    'src/assets/video': 'assets/video'
  })

  args.addPassthroughCopy({
    'src/assets/fonts': 'assets/fonts'
  })

  args.addPassthroughCopy({
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
