/**
 * Objects - Media Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} MediaArgs
 * @prop {string} [title]
 * @prop {string} [source]
 */
export interface MediaArgs {
  title?: string
  source?: string
}

/**
 * @typedef {object} MediaProps
 * @extends {RenderFunctionArgs}
 * @prop {MediaArgs} args
 * @prop {Item} [itemData]
 */
export interface MediaProps extends RenderFunctionArgs {
  args: MediaArgs
  itemData?: Item
}
