/**
 * Data - Initialize
 */

/* Imports */

import type Formation from '@alanizcreative/static-site-formation'
import { config } from '@alanizcreative/static-site-formation/src/config'
import getAllFileData from '@alanizcreative/static-site-formation/src/utils/get-all-file-data'
import render from '@alanizcreative/static-site-formation/src/render'

/* */

interface Args {
  eleventy?: {
    env?: {
      runMode?: string
    }
  }
}

module.exports = async (args: Args): Promise<Formation.RenderReturn[]> => {
  try {
    /* Build env set */

    const mode: string = typeof args?.eleventy?.env?.runMode === 'string' ? args.eleventy.env.runMode : 'serve'

    if (mode === 'build') {
      config.env.build = true
    }

    /* Output */

    const output = await render({
      allData: await getAllFileData({
        resolveProps: {
          image: ['image'],
          data: ['items', 'internalLink', 'category', 'parent']
        }
      })
    })

    if (Array.isArray(output)) {
      return output
    }

    return [{
      slug: '',
      output: ''
    }]
  } catch (error) {
    console.error('Error rendering site: ', error)

    return [{
      slug: '',
      output: ''
    }]
  }
}
