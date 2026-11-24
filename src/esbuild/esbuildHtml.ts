/**
 * Esbuild - Html
 */

import type { Plugin } from 'esbuild'
import type { RenderReturn } from '@alanizcreative/formation-static/render/renderTypes.js'
import { resolve } from 'node:path'
import { cp, mkdir, writeFile } from 'node:fs/promises'
import { print } from '@alanizcreative/formation-static/utils/print/print.js'

/**
 * @typedef {object} EsbuildHtmlArgs
 * @prop {string} [outDir]
 * @prop {Object<string, string>} [copy]
 */
interface EsbuildHtmlArgs {
  outDir: string
  copy?: Record<string, string>
}

/**
 * Create site HTML files.
 *
 * @param {EsbuildHtmlArgs} args
 * @return {Plugin}
 */
const esbuildHtml = (args: EsbuildHtmlArgs): Plugin => {
  const {
    outDir,
    copy
  } = args

  return {
    name: 'esbuildHtml',
    setup (build) {
      build.onEnd(async () => {
        /* Create files */

        const { minify } = await import('html-minifier-terser')
        const { setupBuild } = await import('../setup/setupBuild.js')
        const res: RenderReturn[] = await setupBuild()
        const paths: string[] = []

        for (const item of res) {
          const { slug, output } = item

          if (output === '') { // Avoid writing empty files
            continue
          }

          const outputFile = await minify(output, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true
          })

          let dir = resolve(outDir, `./${slug}`)
          let path = `${dir}/index.html`

          if (slug.endsWith('.html')) {
            dir = resolve(outDir)
            path = `${dir}/${slug}`
          }

          await mkdir(dir, { recursive: true })
          await writeFile(path, outputFile)

          paths.push(path)
        }

        /* Copy assets */

        if (copy) {
          for (const [inPath, outPath] of Object.entries(copy)) {
            await cp(inPath, outPath, { recursive: true })
          }
        }

        /* Success */

        print('[AC] Successfully wrote', paths.join('\n'), 'success')
      })
    }
  }
}

export { esbuildHtml }
