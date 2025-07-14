/**
 * Objects - Video Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} VideoArgs
 * @prop {string} [title]
 * @prop {string} [source]
 */
export interface VideoArgs {
  title?: string
  source?: string
}

/**
 * @typedef {object} VideoProps
 * @extends {RenderFunctionArgs}
 * @prop {VideoArgs} args
 * @prop {Item} [itemData]
 */
export interface VideoProps extends RenderFunctionArgs {
  args: VideoArgs
  itemData?: Item
}
