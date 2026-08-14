/**
 * Layouts - Column Types
 */

/* Imports */

import type { ColumnArgs as FormationColumnArgs } from '@alanizcreative/formation-static/layouts/Column/ColumnTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigAlign, ConfigJustify, ConfigColumn } from '../../config/configTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { contentSchema } from '../../schema/schema.js'
import {
  justifyOption,
  alignOption,
  columnOption
} from '../../config/configTypes.js'

/**
 * A column within a container laid out as a row.
 *
 * @type {z.ZodObject}
 */
export const columnSchema = z.object({
  renderType: z.literal('column'),
  width: columnOption
    .optional()
    .describe('Width out of twelve on the narrowest screens.'),
  widthSmall: columnOption
    .optional()
    .describe('Width out of twelve from small screens up.'),
  widthMedium: columnOption
    .optional()
    .describe('Width out of twelve from medium screens up.'),
  widthLarge: columnOption
    .optional()
    .describe('Width out of twelve from large screens up.'),
  justify: justifyOption
    .optional()
    .describe('Where children sit horizontally.'),
  align: alignOption
    .optional()
    .describe('Where children sit vertically.'),
  grow: z
    .boolean()
    .optional()
    .describe('Let the column absorb leftover space.'),
  position: z
    .enum([
      'top-left',
      'top-left-10',
      'top-right',
      'top-right-10',
      'bottom-left',
      'bottom-left-10',
      'bottom-right',
      'bottom-right-10'
    ])
    .optional()
    .describe('Pin the column to a corner of its parent, for overlapping layouts.'),
  widthCustom: z
    .object({
      init: z.number().optional(),
      small: z.number().optional(),
      medium: z.number().optional(),
      large: z.number().optional()
    })
    .optional()
    .describe('Exact widths as percentages, when the twelve column grid is too coarse.'),
  classes: z
    .string()
    .optional()
    .describe('Extra utility classes. Prefer the props above where one exists.'),
  content: z
    .lazy(() => z.array(contentSchema))
    .describe('What sits inside the column.')
})

/**
 * @typedef {object} ColumnSchema
 * @prop {'column'} renderType
 * @prop {ConfigColumn} [width]
 * @prop {ConfigColumn} [widthSmall]
 * @prop {ConfigColumn} [widthMedium]
 * @prop {ConfigColumn} [widthLarge]
 * @prop {ConfigJustify} [justify]
 * @prop {ConfigAlign} [align]
 * @prop {boolean} [grow]
 * @prop {ColumnPosition} [position]
 * @prop {ColumnWidthCustom} [widthCustom]
 * @prop {string} [classes]
 * @prop {SchemaContent[]} content
 */
export type ColumnSchema = z.infer<typeof columnSchema>

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
