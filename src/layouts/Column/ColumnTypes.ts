/**
 * Layouts - Column Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ColumnArgs as FormationColumnArgs } from '@alanizcreative/formation-static/layouts/Column/ColumnTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} ColumnWidthCustom
 * @prop {number} [init]
 * @prop {number} [small]
 * @prop {number} [medium]
 * @prop {number} [large]
 */
export interface ColumnWidthCustom {
  init?: number
  small?: number
  medium?: number
  large?: number
}

/**
 * @typedef {object} ColumnArgs
 * @extends {FormationColumnArgs}
 * @prop {boolean} [grow=false]
 * @prop {ColumnWidthCustom} [widthCustom]
 */
export interface ColumnArgs extends FormationColumnArgs {
  grow?: boolean
  widthCustom?: ColumnWidthCustom
}

/**
 * @typedef {object} ColumnProps
 * @extends {RenderFunctionArgs}
 * @prop {ColumnArgs} args
 * @prop {Item} [itemData]
 */
export interface ColumnProps extends RenderFunctionArgs  {
  args: ColumnArgs
  itemData?: Item
}
