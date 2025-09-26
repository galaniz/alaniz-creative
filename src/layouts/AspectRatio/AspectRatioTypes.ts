/**
 * Layouts - Aspect Ratio Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} AspectRatioArgs
 * @prop {number} [percent=100]
 */
export interface AspectRatioArgs {
  percent?: number
}

/**
 * @typedef {object} AspectRatioProps
 * @extends {RenderFunctionArgs}
 * @prop {AspectRatioArgs} args
 * @prop {Item} [itemData]
 */
export interface AspectRatioProps extends RenderFunctionArgs {
  args: AspectRatioArgs
  itemData?: Item
}
