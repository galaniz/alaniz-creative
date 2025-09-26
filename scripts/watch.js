// @ts-check

/**
 * Scripts - Watch
 */

/* Imports */

import { readFile } from 'node:fs/promises'
import esbuild from 'esbuild'
import nodemon from 'nodemon'

/**
 * Site context args.
 *
 * @type {esbuild.BuildOptions}
 */
const siteArgs = {
  entryPoints: [
    'site/**/*.html'
  ],
  write: false,
  outdir: 'site',
  logLevel: 'info',
  resolveExtensions: [
    '.html'
  ],
  plugins: [
    {
      name: 'watchHtml',
      setup (build) {
        build.onLoad({ filter: /\.html$/ }, async (args) => {
          return {
            contents: await readFile(args.path, 'utf8'),
            loader: 'copy'
          }
        })
      }
    }
  ]
}

/**
 * Serve site files.
 */
const siteCtx = await esbuild.context(siteArgs)
await siteCtx.watch()
await siteCtx.serve({
  servedir: './site',
  keyfile: './esbuild.key',
  certfile: './esbuild.cert'
})

/**
 * Restart process to circumvent stale imports.
 */
nodemon({
  script: 'lib/esbuild/esbuild.js',
  exec: 'node lib/esbuild/esbuild.js --watch --site',
  watch: [
    'lib/**/*.js',
    'src/**/*.scss'
  ],
  ignore: [
    'lib/esbuild/*',
    'lib/**/*Worker.js'
  ],
  ext: 'js,scss',
  delay: 400
})

/**
 * Clean up context on crash or quit.
 */
const siteCtxDispose = () => {
  siteCtx.dispose()
}

nodemon.on('crash', siteCtxDispose)
nodemon.on('quit', siteCtxDispose)
