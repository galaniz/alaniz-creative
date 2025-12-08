/**
 * Layouts - Container Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type {
  ConfigSize,
  ConfigJustify,
  ConfigAlign,
  ConfigContainer,
  ConfigBackgroundColor
} from '../../config/configTypes.js'
import type {
  ContainerArgs as FormationContainerArgs
} from '@alanizcreative/formation-static/layouts/Container/ContainerTypes.js'

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
