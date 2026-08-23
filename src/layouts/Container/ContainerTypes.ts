/**
 * Layouts - Container Types
 */

import type {
  ContainerArgs as FormationContainerArgs
} from '@alanizcreative/formation-static/layouts/Container/ContainerTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type {
  ConfigSize,
  ConfigJustify,
  ConfigAlign,
  ConfigContainer,
  ConfigBackgroundColor
} from '../../config/configTypes.js'
import { z } from 'zod'
import { contentSchema } from '../../schema/schema.js'
import {
  sizeOption,
  justifyOption,
  alignOption,
  containerOption,
  backgroundOption
} from '../../config/configTypes.js'

/**
 * A grouping element carrying spacing, width and layout.
 *
 * @type {z.ZodObject}
 */
export const containerSchema = z.object({
  renderType: z.literal('container'),
  tag: z
    .string()
    .optional()
    .describe('HTML tag to render, for example section, ul, dl or figure. Defaults to div.'),
  maxWidth: containerOption
    .optional()
    .describe('Constrain the content to a named max width. Narrower widths suit prose.'),
  layout: z
    .enum(['block', 'col', 'col-s', 'col-m', 'col-l', 'row', 'row-s', 'row-m', 'row-l'])
    .optional()
    .describe('Stacked, column or row. The suffix is the screen size the row starts at.'),
  background: backgroundOption
    .optional()
    .describe('Background color for the whole band.'),
  border: z
    .enum(['rounded', 'full'])
    .optional()
    .describe('Border treatment.'),
  justify: justifyOption
    .optional()
    .describe('Where children sit horizontally.'),
  align: alignOption
    .optional()
    .describe('Where children sit vertically.'),
  gap: sizeOption
    .optional()
    .describe('Space between children.'),
  gapLarge: sizeOption
    .optional()
    .describe('Space between children on large screens.'),
  paddingTop: sizeOption
    .optional()
    .describe('Space above the content.'),
  paddingTopLarge: sizeOption
    .optional()
    .describe('Space above the content on large screens.'),
  paddingBottom: sizeOption
    .optional()
    .describe('Space below the content.'),
  paddingBottomLarge: sizeOption
    .optional()
    .describe('Space below the content on large screens.'),
  paddingLeft: sizeOption
    .optional()
    .describe('Space to the left of the content.'),
  paddingLeftLarge: sizeOption
    .optional()
    .describe('Space to the left of the content on large screens.'),
  paddingRight: sizeOption
    .optional()
    .describe('Space to the right of the content.'),
  paddingRightLarge: sizeOption
    .optional()
    .describe('Space to the right of the content on large screens.'),
  grow: z
    .boolean()
    .optional()
    .describe('Let the container absorb leftover space.'),
  shrink: z
    .boolean()
    .optional()
    .describe('Let the container shrink below its content size. Defaults to true.'),
  breakout: z
    .boolean()
    .optional()
    .describe('Let the content run wider than its parent max width.'),
  richTextStyles: z
    .boolean()
    .optional()
    .describe('Apply prose spacing to the rich text inside. Set this on any container of body copy.'),
  content: z
    .lazy(() => z.union([z.string(), z.array(contentSchema)]))
    .describe('What sits inside the container.')
})

/**
 * @typedef {object} ContainerSchema
 * @prop {'container'} renderType
 * @prop {string} [tag='div']
 * @prop {ConfigContainer} [maxWidth]
 * @prop {ContainerLayout} [layout]
 * @prop {ConfigBackgroundColor} [background]
 * @prop {'rounded'|'full'} [border]
 * @prop {ConfigJustify} [justify]
 * @prop {ConfigAlign} [align]
 * @prop {ConfigSize} [gap]
 * @prop {ConfigSize} [gapLarge]
 * @prop {ConfigSize} [paddingTop]
 * @prop {ConfigSize} [paddingTopLarge]
 * @prop {ConfigSize} [paddingBottom]
 * @prop {ConfigSize} [paddingBottomLarge]
 * @prop {ConfigSize} [paddingLeft]
 * @prop {ConfigSize} [paddingLeftLarge]
 * @prop {ConfigSize} [paddingRight]
 * @prop {ConfigSize} [paddingRightLarge]
 * @prop {boolean} [grow]
 * @prop {boolean} [shrink=true]
 * @prop {boolean} [breakout]
 * @prop {boolean} [richTextStyles]
 * @prop {string|SchemaContent[]} content
 */
export type ContainerSchema = z.infer<typeof containerSchema>

/**
 * @typedef {'block'|'col'|'col-s'|'col-m'|'col-l'|'row'|'row-s'|'row-m'|'row-l'} ContainerLayout
 */
export type ContainerLayout =
  'block' |
  'col' |
  'col-s' |
  'col-m' |
  'col-l' |
  'row' |
  'row-s' |
  'row-m' |
  'row-l'

/**
 * @typedef {object} ContainerArgs
 * @extends {FormationContainerArgs}
 * @prop {ConfigContainer} [maxWidth]
 * @prop {ConfigBackgroundColor} [background]
 * @prop {ContainerLayout} [layout='block']
 * @prop {ConfigSize} [paddingTop]
 * @prop {ConfigSize} [paddingTopLarge]
 * @prop {ConfigSize} [paddingBottom]
 * @prop {ConfigSize} [paddingBottomLarge]
 * @prop {ConfigSize} [paddingLeft]
 * @prop {ConfigSize} [paddingLeftLarge]
 * @prop {ConfigSize} [paddingRight]
 * @prop {ConfigSize} [paddingRightLarge]
 * @prop {ConfigSize} [gap]
 * @prop {ConfigSize} [gapLarge]
 * @prop {ConfigJustify} [justify]
 * @prop {ConfigAlign} [align]
 * @prop {'rounded'|'full'} [border]
 * @prop {boolean} [grow=false]
 * @prop {boolean} [shrink=true]
 * @prop {boolean} [breakout=false]
 * @prop {boolean} [richTextStyles=false]
 */
export interface ContainerArgs extends FormationContainerArgs<string, ConfigContainer> {
  background?: ConfigBackgroundColor
  layout?: ContainerLayout
  paddingTop?: ConfigSize
  paddingTopLarge?: ConfigSize
  paddingBottom?: ConfigSize
  paddingBottomLarge?: ConfigSize
  paddingLeft?: ConfigSize
  paddingLeftLarge?: ConfigSize
  paddingRight?: ConfigSize
  paddingRightLarge?: ConfigSize
  gap?: ConfigSize
  gapLarge?: ConfigSize
  justify?: ConfigJustify
  align?: ConfigAlign
  border?: 'rounded' | 'full'
  grow?: boolean
  shrink?: boolean
  breakout?: boolean
  richTextStyles?: boolean
}

/**
 * @typedef {object} ContainerProps
 * @extends {RenderFunctionArgs}
 * @prop {ContainerArgs} args
 * @prop {Item} [itemData]
 */
export interface ContainerProps extends RenderFunctionArgs  {
  args: ContainerArgs
  itemData?: Item
}
