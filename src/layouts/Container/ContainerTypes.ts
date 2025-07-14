/**
 * Layouts - Container Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ContainerArgs as FormationContainerArgs } from '@alanizcreative/formation-static/layouts/Column/ColumnTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'

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
 * @prop {ContainerLayout} [layout='block']
 * @prop {'rounded'|'full'} [border]
 * @prop {boolean} [grow=false]
 */
export interface ContainerArgs extends FormationContainerArgs {
  layout?: ContainerLayout
  border?: 'rounded' | 'full'
  grow?: boolean
}

"classes": "b-all b-theme b-radius-s b-radius-m-m overflow-hidden l-isolate",
"background": "background-light",
"classes": "flex-grow-1",

tag = 'div',
layout = 'column',
maxWidth = '',
paddingTop = '',
paddingTopLarge = '',
paddingBottom = '',
paddingBottomLarge = '',
gap = '',
gapLarge = '',
justify = '',
align = '',
classes = '',
attr = '',
richTextStyles = false

tag?: string
maxWidth?: string | number
layoutClasses?: string
classes?: string
style?: string
attr?: string
nest?: boolean

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
