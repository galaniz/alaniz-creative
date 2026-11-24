/**
 * Esbuild
 */

import type { BuildOptions } from 'esbuild'
import dotenv from 'dotenv'
import esbuild from 'esbuild'
import { glob } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { esbuildHtml } from './esbuildHtml.js'
import { esbuildScss } from './esbuildScss.js'
import { setupLocal } from '../setup/setupLocal.js'
dotenv.config()

/**
 * Check if arg exists.
 *
 * @param {string} a
 * @return {boolean}
 */
const argExists = (a: string): boolean => process.argv.includes(`--${a}`)

/**
 * Watch styles, client scripts and data and run local worker.
 *
 * @type {boolean}
 */
const isWatch: boolean = argExists('watch')

/**
 * Build site.
 *
 * @type {boolean}
 */
const isSite: boolean = argExists('site')

/**
 * Site files.
 *
 * @type {string[]}
 */
const siteFiles: string[] = []

for await (const file of glob('lib/**/*.js')) {
  siteFiles.push(file)
}

/**
 * Site copy assets.
 *
 * @type {Object<string, string>}
 */
const siteCopyAssets: Record<string, string> = {
  'static/favicon': 'site/favicon',
  'static/fonts': 'site/fonts'
}

siteCopyAssets[
  process.env.ENVIRONMENT === 'production' ? 'static/robots-prod.txt' : 'static/robots-dev.txt'
] = 'site/robots.txt'

/**
 * Site context args.
 *
 * @type {BuildOptions}
 */
const siteArgs: BuildOptions = {
  entryPoints: siteFiles,
  write: false,
  logLevel: 'debug',
  outdir: 'site',
  platform: 'node',
  plugins: [
    esbuildHtml({
      outDir: 'site',
      copy: siteCopyAssets
    })
  ]
}

/**
 * Build site files.
 */
if (isSite) {
  await esbuild.build(siteArgs)
}

/**
 * Watch styles, client scripts and data and serve pages with local worker.
 */
if (isWatch) {
  const localDataWatcher = await setupLocal()

  const ctx = await esbuild.context({
    entryPoints: [
      'src/**/*Client.ts',
      'src/**/*.scss'
    ],
    outbase: 'src',
    entryNames: '[ext]/[dir]/[name]',
    outdir: 'site',
    bundle: true,
    splitting: true,
    format: 'esm',
    target: 'es2022',
    logLevel: 'warning',
    external: [
      '*.woff',
      '*.woff2'
    ],
    resolveExtensions: [
      '.ts',
      '.js',
      '.scss'
    ],
    plugins: [
      esbuildScss()
    ]
  })

  await ctx.rebuild()
  await ctx.watch()

  /* Render pages from local data with live reload */

  const wrangler = spawn('npx', [
    'wrangler',
    'dev',
    '--config',
    'wrangler.jsonc',
    '--env',
    'local',
    '--live-reload'
  ], { stdio: 'inherit' })

  wrangler.on('exit', (code) => {
    localDataWatcher.close()
    void ctx.dispose().then(() => process.exit(code ?? 0))
  })
}
