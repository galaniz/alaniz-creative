/**
 * Data - Initialize
 */

/* Imports */

import getAllFileData from '@alanizcreative/static-site-formation/src/utils/get-all-file-data'
import processImages from '@alanizcreative/static-site-formation/src/utils/process-images'
import writeStoreFiles from '@alanizcreative/static-site-formation/src/utils/write-store-files'
import writeServerlessFiles from '@alanizcreative/static-site-formation/src/utils/write-serverless-files'
import render from '@alanizcreative/static-site-formation/src/render'
import filters from '../src/filters'
import actions from '../src/actions'
import config from '../src/config'

/* Eleventy init */

interface InitArgs {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

module.exports = async (args: InitArgs): Promise<FRM.RenderReturn[]> => {
  try {
    /* Build env */

    const mode: string = typeof args?.eleventy?.env?.runMode === 'string' ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      config.env.build = true

      /* Create images and image meta */

      await processImages()
    }

    /* Render output */

    filters()
    actions()

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
