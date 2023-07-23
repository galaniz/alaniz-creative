/**
 * Data - Initialize
 */

/* Imports */

import { PurgeCSS } from 'purgecss'
import { render, getAllFileData, processImages, writeStoreFiles, writeServerlessFiles } from '@alanizcreative/static-site-formation/lib'
import config from '../src/config'
import cache from '../src/utils/cache'

/* Eleventy init */

interface InitArgs {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

interface InitPurge {
  css: string
}

module.exports = async (args: InitArgs): Promise<FRM.RenderReturn[]> => {
  try {
    /* Build env */

    const mode: string = typeof args?.eleventy?.env?.runMode === 'string' ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      config.env.build = true

      /* Create images and image meta */

      await processImages()

      /* Purge unused css */

      config.filters.renderItem = async (output: string): Promise<string> => {
        const purge: InitPurge[] = await new PurgeCSS().purge({
          content: [
            {
              raw: output,
              extension: 'html'
            }
          ],
          css: [
            `./site/assets/css/${config.namespace}.css`
          ],
          safelist: [
            'o-form__error',
            'l-flex',
            'l-gap-margin-4xs',
            'l-padding-top-3xs',
            't-line-height-0',
            'l-width-xs',
            'l-height-s',
            't-s',
            't-weight-medium'
          ],
          dynamicAttributes: [
            'data-open',
            'data-overflow',
            'data-show-items',
            'data-show',
            'data-visible',
            'data-state',
            'data-using-mouse',
            'data-no-scroll',
            'data-hide'
          ]
        })

        if (purge.length !== 0) {
          output = output.replace(config.vars.cssLink, `<style>${purge[0].css}</style>`)
        }

        return output
      }
    }

    /* Cache data */

    if (config.env.cache) {
      config.filters.cacheData = async (cacheData: FRM.AnyObject, { key, type = 'get', data }: FRM.CacheDataFilterArgs): Promise<object> => {
        const c = await cache(key, type, data)

        if (c !== undefined) {
          cacheData = c
        }

        return cacheData
      }
    }

    /* Render output */

    const output = await render({
      allData: await getAllFileData({
        resolveProps: {
          image: ['image'],
          data: ['items', 'internalLink', 'category', 'parent', 'related']
        },
        excludeProps: {
          data: ['content', 'related', 'meta'],
          archive: {
            posts: ['content', 'related', 'meta'],
            terms: ['content', 'related', 'category', 'meta']
          }
        }
      })
    })

    /* Data json files */

    await writeStoreFiles()

    /* Serverless files */

    await writeServerlessFiles()

    /* Output */

    if (Array.isArray(output)) {
      return output
    }

    return [{
      slug: '',
      output: ''
    }]
  } catch (error) {
    console.error(config.console.red, '[AC] Error rendering site: ', error)

    /* Output */

    return [{
      slug: '',
      output: ''
    }]
  }
}
