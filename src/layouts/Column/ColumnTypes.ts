/**
 * Layouts - Column Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ConfigAlign, ConfigJustify, ConfigColumn } from '../../config/configTypes.js'
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
 * @typedef {'top-left'|'top-left-10'|'top-right'|'top-right-10'|'bottom-left'|'bottom-left-10'|'bottom-right'|'bottom-right-10'} ColumnPosition
 */
export type ColumnPosition = 
  'top-left' |
  'top-left-10' |
  'top-right' |
  'top-right-10' |
  'bottom-left' |
  'bottom-left-10' |
  'bottom-right' |
  'bottom-right-10'

/**
 * @typedef {object} ColumnArgs
 * @extends {FormationColumnArgs}
 * @prop {ConfigColumn} [width]
 * @prop {ConfigColumn} [widthSmall]
 * @prop {ConfigColumn} [widthMedium]
 * @prop {ConfigColumn} [widthLarge]
 * @prop {boolean} [grow=false]
 * @prop {ColumnWidthCustom} [widthCustom]
 * @prop {ColumnPosition} [position]
 * @prop {ConfigJustify} [justify]
 * @prop {ConfigAlign} [align]
 */
export interface ColumnArgs extends FormationColumnArgs<string, ConfigColumn> {
  grow?: boolean
  widthCustom?: ColumnWidthCustom
  position?: ColumnPosition
  justify?: ConfigJustify
  align?: ConfigAlign
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
