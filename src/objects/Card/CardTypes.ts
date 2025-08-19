/**
 * Objects - Card Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigHeadingLevel } from '../../config/configTypes.js'

/**
 * @typedef {'minimal'|'alternate'|'cascade'} CardType
 */
export type CardType = 'minimal' | 'alternate' | 'cascade'

/**
 * @typedef {object} CardArgs
 * @prop {Item} [internalLink]
 * @prop {ConfigHeadingLevel} [headingLevel=3]
 * @prop {CardType} [type='minimal']
 * @prop {number} [index=0]
 * @prop {number} [length=1]
 */
export interface CardArgs {
  internalLink?: Item
  headingLevel?: ConfigHeadingLevel
  type?: CardType
  index?: number
  length?: number
}

/**
 * @typedef {object} CardProps
 * @extends {RenderFunctionArgs}
 * @prop {CardArgs} args
 * @prop {Item} [itemData]
 */
export interface CardProps extends RenderFunctionArgs {
  args: CardArgs
  itemData?: Item
}
