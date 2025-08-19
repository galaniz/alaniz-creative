/**
 * Objects - Posts Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigHeadingLevel } from '../../config/configTypes.js'
import type { Item } from '../../global/globalTypes.js'

/**
 * @typedef {object} PostsArgs
 * @prop {string} [contentType]
 * @prop {number} [display=1]
 * @prop {'date'|'title'} [order='date']
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {'text'|'minimal'|'alternate'|'cascade'} [layout='minimal']
 */
export interface PostsArgs {
  contentType?: string
  display?: number
  order?: 'date' | 'title'
  headingLevel?: ConfigHeadingLevel
  layout?: 'text' | 'minimal' | 'alternate' | 'cascade'
}

/**
 * @typedef {object} PostsProps
 * @extends {RenderFunctionArgs}
 * @prop {PostsArgs} args
 * @prop {Item} [itemData]
 */
export interface PostsProps extends RenderFunctionArgs {
  args: PostsArgs
  itemData?: Item
}
