/**
 * Objects - Image Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type {
  RenderFunctionArgs,
  RenderFile,
  RenderRichText
} from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigAspectRatio, ConfigSizes } from '../../config/configTypes.js'

/**
 * @typedef {object} ImageArgs
 * @prop {RenderFile} [image]
 * @prop {string} [alt]
 * @prop {ConfigAspectRatio} [aspectRatio]
 * @prop {number} [maxWidth]
 * @prop {RenderRichText[]} [caption]
 * @prop {boolean} [lazy=true]
 * @prop {boolean} [border=false]
 * @prop {'rounded'|'full'|'none'} [borderRadius='rounded']
 * @prop {ConfigSizes} [width]
 * @prop {ConfigSizes} [widthLarge]
 * @prop {boolean} [contain=false]
 * @prop {'center'} [align]
 * @prop {string} [classes]
 */
export interface ImageArgs {
  image?: RenderFile
  alt?: string
  aspectRatio?: ConfigAspectRatio
  maxWidth?: number
  caption?: RenderRichText[]
  lazy?: boolean
  border?: boolean
  borderRadius?: 'rounded' | 'full' | 'none'
  width?: ConfigSizes
  widthLarge?: ConfigSizes
  contain?: boolean
  align?: 'center'
  classes?: string
}

/**
 * @typedef {object} ImageProps
 * @extends {RenderFunctionArgs}
 * @prop {ImageArgs} args
 * @prop {Item} [itemData]
 */
export interface ImageProps extends RenderFunctionArgs {
  args: ImageArgs
  itemData?: Item
}
