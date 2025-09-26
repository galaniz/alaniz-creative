/**
 * Components - Hero Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ConfigBlob } from '../../config/configTypes.js'
import type { RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ButtonArgs } from '../../objects/Button/ButtonTypes.js'

/**
 * @typedef {'one'|'two'|'three'|'four'|'five'} HeroWave
 */
export type HeroWave = 'one' | 'two' | 'three' | 'four' | 'five'

/**
 * @typedef {object} HeroWaveSvg
 * @prop {string} path
 * @prop {number} width
 * @prop {number} height
 */
export interface HeroWaveSvg {
  path: string
  width: number
  height: number
}

/**
 * @typedef {object} HeroArgs
 * @extends {Item}
 * @prop {string} [contentType='page']
 * @prop {string} [archive]
 * @prop {'media-text'|'minimal'|'profile'|'error'} [type='media-text']
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {RenderFile} [image]
 * @prop {HeroWave} [wave]
 * @prop {ConfigBlob} [blob]
 * @prop {boolean} [border=false]
 * @prop {HeroAction} [action]
 */
export interface HeroArgs extends Item {
  contentType?: string
  archive?: string
  type?: 'media-text' | 'minimal' | 'profile' | 'error'
  title?: string
  text?: string
  image?: RenderFile
  wave?: HeroWave
  blob?: ConfigBlob
  border?: boolean
  action?: ButtonArgs
}
