/**
 * Data - Initialize
 */

/* Imports */

import { addAction } from '@alanizcreative/static-site-formation/src/utils/actions'
import getAllFileData from '@alanizcreative/static-site-formation/src/utils/get-all-file-data'
import getPathDepth from '@alanizcreative/static-site-formation/src/utils/get-path-depth'
// import processImages from '@alanizcreative/static-site-formation/src/utils/process-images'
import writeStoreFiles from '@alanizcreative/static-site-formation/src/utils/write-store-files'
import writeServerlessFiles from '@alanizcreative/static-site-formation/src/utils/write-serverless-files'
import render from '@alanizcreative/static-site-formation/src/render'
import config from '../src/config'

/* Eleventy init */

interface Args {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

interface RenderEndArgs {
  contentType: string
  slug: string
  output: string
  props: {
    id: string
    title: string
    slug: string
    content?: any
    meta?: object
    basePermalink?: string
    [key: string]: any
  }
}

module.exports = async (args: Args): Promise<FRM.RenderReturn[]> => {
  try {
    /* Build env */

    const mode: string = typeof args?.eleventy?.env?.runMode === 'string' ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      config.env.build = true

      /* Create images and image meta */

      // await processImages()
    }

    /* Render output */

    addAction('renderEnd', (args: RenderEndArgs): void => {
      const { slug = '', props } = args
      const { passwordProtected = false } = props

      if (passwordProtected === true && slug !== '') {
        if (config.serverless.routes.passwordProtect === undefined) {
          config.serverless.routes.passwordProtect = []
        }

        const path = `${slug.replace(/^\/|\/$/gm, '')}/_middleware.js`

        config.serverless.routes.passwordProtect.push({
          path,
          content: `import passwordProtect from '${getPathDepth(`${config.serverless.dir}/${path}`)}src/serverless/password-protect'; const protect = async ({ request, env, next }) => { return await passwordProtect({ request, env, next }) }; export const onRequestGet = [protect];`
        })
      }
    })

    const output = await render({
      allData: await getAllFileData({
        resolveProps: {
          image: ['image'],
          data: ['items', 'internalLink', 'category', 'parent', 'related']
        },
        excludeProps: {
          data: ['content', 'related', 'meta'],
          archive: {
            posts: ['content', 'related'],
            terms: ['content', 'related', 'category']
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
    console.error('Error rendering site: ', error)

    /* Output */

    return [{
      slug: '',
      output: ''
    }]
  }
}
