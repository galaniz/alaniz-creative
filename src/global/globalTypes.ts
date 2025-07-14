/**
 * Global - Types
 */

/* Imports */

import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { HeroArgs } from '../components/Hero/HeroTypes.js'

/**
 * @typedef {'one'|'two'|'three'|'four'|'five'|'six'} Blob
 */
export type Blob = 'one' | 'two' | 'three' | 'four' | 'five' | 'six'

/**
 * @typedef {object} Item
 * @extends {RenderItem}
 * @prop {boolean} [passwordProtect]
 * @prop {HeroArgs} [hero]
 * @prop {Blob} [blob]
 * @prop {Item[]} [related]
 * @prop {InternalLink[]} [category]
 * @prop {Object<string, string>} [theme]
 */
export interface Item extends RenderItem {
  passwordProtect?: boolean
  hero?: HeroArgs
  blob?: Blob
  related?: Item[]
  category?: InternalLink[]
  theme?: Record<string, string>
}
