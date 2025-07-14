/**
 * Objects - Button Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigSizes, ConfigJustify } from '../../config/configTypes.js'

/**
 * @typedef {object} ButtonArgs
 * @prop {string} [title]
 * @prop {InternalLink} [internalLink]
 * @prop {string} [externalLink]
 * @prop {string} [link]
 * @prop {'primary'|'secondary'} [type]
 * @prop {'m'|'l'} [size='m']
 * @prop {ConfigJustify} [justify]
 * @prop {boolean} [richText]
 * @prop {ConfigSizes} [paddingTop]
 * @prop {ConfigSizes} [paddingBottom]
 * @prop {string} [icon]
 */
export interface ButtonArgs {
  title?: string
  internalLink?: InternalLink
  externalLink?: string
  link?: string
  type?: 'primary' | 'secondary'
  size?: 'm' | 'l'
  justify?: ConfigJustify
  richText?: boolean
  paddingTop?: ConfigSizes
  paddingBottom?: ConfigSizes
  icon?: string
}

/**
 * @typedef {object} ButtonProps
 * @extends {RenderFunctionArgs}
 * @prop {ButtonArgs} args
 * @prop {Item} [itemData]
 */
export interface ButtonProps extends RenderFunctionArgs {
  args: ButtonArgs
  itemData?: Item
}
