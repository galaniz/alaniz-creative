/**
 * Layouts - Container Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type {
  ConfigSizes,
  ConfigJustify,
  ConfigAlign,
  ConfigContainer,
  ConfigBackgrounds
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
 * @prop {ConfigBackground} [background]
 * @prop {ContainerLayout} [layout='block']
 * @prop {ConfigSizes} [paddingTop]
 * @prop {ConfigSizes} [paddingTopLarge]
 * @prop {ConfigSizes} [paddingBottom]
 * @prop {ConfigSizes} [paddingBottomLarge]
 * @prop {ConfigSizes} [paddingLeft]
 * @prop {ConfigSizes} [paddingLeftLarge]
 * @prop {ConfigSizes} [paddingRight]
 * @prop {ConfigSizes} [paddingRightLarge]
 * @prop {ConfigSizes} [gap]
 * @prop {ConfigSizes} [gapLarge]
 * @prop {ConfigJustify} [justify]
 * @prop {ConfigAlign} [align]
 * @prop {'rounded'|'full'} [border]
 * @prop {boolean} [grow=false]
 * @prop {boolean} [shrink=true]
 * @prop {boolean} [breakout=false]
 * @prop {boolean} [richTextStyles=false]
 */
export interface ContainerArgs extends FormationContainerArgs<string, ConfigContainer> {
  background?: ConfigBackgrounds
  layout?: ContainerLayout
  paddingTop?: ConfigSizes
  paddingTopLarge?: ConfigSizes
  paddingBottom?: ConfigSizes
  paddingBottomLarge?: ConfigSizes
  paddingLeft?: ConfigSizes
  paddingLeftLarge?: ConfigSizes
  paddingRight?: ConfigSizes
  paddingRightLarge?: ConfigSizes
  gap?: ConfigSizes
  gapLarge?: ConfigSizes
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
