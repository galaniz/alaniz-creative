/**
 * Setup - Data
 */

import type { RenderAllData } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { AllLocalDataArgs } from '@alanizcreative/formation-static/local/localDataTypes.js'
import { postsData } from '../objects/Posts/Posts.js'
import { config } from '../config/config.js'

/**
 * Props resolved to entries and props removed from references.
 *
 * @type {AllLocalDataArgs}
 */
const localDataArgs: AllLocalDataArgs = {
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
}

/**
 * Store whole type items for posts.
 *
 * @param {RenderAllData} [data]
 * @return {void}
 */
const setPostsData = (data?: RenderAllData): void => {
  config.wholeTypes.forEach(type => {
    if (type === 'page') {
      return
    }

    postsData[type] = data?.content[type] || []
  })
}

export {
  localDataArgs,
  setPostsData
}
