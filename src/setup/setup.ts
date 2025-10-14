/**
 * Setup - Build
 */

/* Imports */

import type { RenderReturn } from '@alanizcreative/formation-static/render/renderTypes.js'
import { resolve } from 'node:path'
import esbuild from 'esbuild'
import * as sass from 'sass'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import purgecss from '@fullhuman/postcss-purgecss'
import { render, setRenderFunctions } from '@alanizcreative/formation-static/render/render.js'
import { isArray } from '@alanizcreative/formation-static/utils/array/array.js'
import { setFilters } from '@alanizcreative/formation-static/utils/filter/filter.js'
import { setActions } from '@alanizcreative/formation-static/utils/action/action.js'
import { setConfigFilter } from '@alanizcreative/formation-static/config/config.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { createStoreFiles } from '@alanizcreative/formation-static/store/storeFiles.js'
import { createRedirectsFile } from '@alanizcreative/formation-static/redirects/redirectsFile.js'
import { scripts, styles } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { getAllLocalData } from '@alanizcreative/formation-static/local/localData.js'
import { setStore } from '@alanizcreative/formation-static/store/store.js'
import { storeArgs } from '../store/store.js'
import { postsData } from '../objects/Posts/Posts.js'
import { renderFunctions } from '../render/render.js'
import { esbuildScss } from '../esbuild/esbuildScss.js'
import { config, configVars } from '../config/config.js'
import { filters } from '../filters/filters.js'
import { actions } from '../actions/actions.js'
import { createSeoSitemapFiles } from '../seo/seoSitemapFiles.js'
import { HttpError } from '../components/HttpError/HttpError.js'

/**
 * Set up config, filters, actions and fetch/render in build context.
 *
 * @param {boolean} build
 * @return {Promise<RenderReturn[]>}
 */
const setupBuild = async (build: boolean): Promise<RenderReturn[]> => {
  /* Config env */

  setConfigFilter(process.env)

  /* Build */

  config.env.build = build

  /* Root */

  config.env.dir = resolve('./')

  /* Build styles and scripts */

  actions.renderEnd = async () => {
    const entryPoints: Record<string, string> = {
      ...Object.fromEntries(scripts.build.entries()),
      ...Object.fromEntries(styles.build.entries()),
      'css/global/globalNoJs': 'src/global/globalNoJs.scss'
    }

    const { css, js } = configVars

    if (css.in && css.out) {
      entryPoints[css.out] = `${css.in}.scss`
    }

    if (js.in && js.out) {
      entryPoints[js.out] = `${js.in}.js`
    }

    await esbuild.build({
      entryPoints,
      outdir: 'site/assets',
      minify: true,
      bundle: true,
      splitting: true,
      format: 'esm',
      target: 'es6',
      external: [
        '*.woff',
        '*.woff2'
      ],
      resolveExtensions: [
        '.js',
        '.scss'
      ],
      plugins: [
        esbuildScss()
      ]
    })
  }

  /* Inline styles */

  filters.renderItem = async (output) => {
    if (!configVars.css.in || !configVars.css.replace) {
      return output
    }

    const globalFile = `${configVars.css.in}.scss`
    const inlineFiles = new Set(styles.item.values())

    inlineFiles.add(globalFile)

    let globalStyles = ''
    let inlineStyles = ''

    for (const file of inlineFiles) {
      const cachedStyles = configVars.css.cache.get(file)
      const isGlobal = file === globalFile

      if (cachedStyles && isGlobal) {
        globalStyles = cachedStyles
        continue
      }

      if (cachedStyles && !isGlobal) {
        inlineStyles += cachedStyles
        continue
      }

      const sassRes = sass.compile(`./${file}`, {
        loadPaths: [
          'node_modules',
          './src'
        ],
        style: 'compressed'
      })

      const sassCss = sassRes.css

      if (!isStringStrict(sassCss)) {
        continue
      }

      if (isGlobal) {
        globalStyles = sassCss
      } else {
        inlineStyles += sassCss
      }

      configVars.css.cache.set(file, sassCss)
    }

    if (globalStyles && config.env.build) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
      const purge = (purgecss as any).default || purgecss
      const postRes = await postcss(
        [
          autoprefixer,
          purge({ // eslint-disable-line @typescript-eslint/no-unsafe-call
            content: [
              {
                raw: output,
                extension: 'html'
              }
            ],
            safelist: [
              ':focus',
              ':focus-visible',
              ...configVars.css.safelist
            ],
            dynamicAttributes: [
              'data-stop-scroll'
            ]
          })
        ]
      ).process(
        globalStyles, {
          from: undefined
        }
      )

      const postCss = postRes.css

      if (isStringStrict(postCss)) {
        globalStyles = postCss
      }
    }

    if (globalStyles) {
      output = output.replace(
        configVars.css.replace,
        `<style>${globalStyles}${inlineStyles}</style>`
      )
    }

    /* Clear */

    configVars.css.safelist = []

    /* Output */

    return output
  }

  /* Set up filters, actions and render functions */

  setFilters(filters)
  setActions(actions)
  setRenderFunctions(renderFunctions)
  setStore(storeArgs)

  /* Render output */

  const data = await getAllLocalData({
    refProps: [
      'internalLink',
      'term',
      'taxonomy',
      'related',
      'category'
    ],
    unsetProps: [
      'content',
      'related'
    ]
  })

  config.wholeTypes.forEach(type => {
    if (type === 'page') {
      return
    }

    postsData[type] = data?.content[type] || []
  })

  const output = await render({ allData: data })

  /* Store files */

  await createStoreFiles()

  /* Redirect and sitemap files */

  if (build) {
    await createRedirectsFile()
    await createSeoSitemapFiles()
  }

  /* Output */

  const isArr = isArray(output)

  if (isArr) {
    output.push({
      slug: '404.html',
      output: await HttpError({ code: 404 })
    })
  }

  if (!isArr) {
    throw new Error('No output')
  }

  return output
}

/* Exports */

export { setupBuild }
