/**
 * Global - Types
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { HeroArgs } from '../components/Hero/HeroTypes.js'
import type { ConfigBlob } from '../config/configTypes.js'

/**
 * @typedef {object} Item
 * @extends {RenderItem}
 * @prop {boolean} [passwordProtect]
 * @prop {HeroArgs} [hero]
 * @prop {ConfigBlob} [blob]
 * @prop {Item[]} [related]
 * @prop {RenderItem[]} [category]
 * @prop {Object<string, string>} [theme]
 * @prop {string} [date]
 * @prop {string} [dateModified]
 * @prop {'blank'} [template]
 */
export interface Item extends RenderItem {
  passwordProtect?: boolean
  hero?: HeroArgs
  blob?: ConfigBlob
  related?: Item[]
  category?: RenderItem[]
  theme?: Record<string, string>
  date?: string
  dateModified?: string
  template?: 'blank'
}
