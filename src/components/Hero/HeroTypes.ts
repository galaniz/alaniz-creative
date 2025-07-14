/**
 * Components - Hero Types
 */

/* Imports */

import type { Blob } from '../../global/globalTypes.js'
import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'

/**
 * @typedef {object} HeroAction
 * @prop {string} [title]
 * @prop {InternalLink} [internalLink]
 */
export interface HeroAction {
  title?: string
  internalLink?: InternalLink
}

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
 * @prop {string} [contentType='page']
 * @prop {string} [archive]
 * @prop {'media-text'|'minimal'|'profile'} [type='media-text']
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {RenderFile} [image]
 * @prop {HeroWave} [wave]
 * @prop {Blob} [blob]
 * @prop {boolean} [border=false]
 * @prop {HeroAction} [action]
 */
export interface HeroArgs {
  contentType?: string
  archive?: string
  type?: 'media-text' | 'minimal' | 'profile'
  title?: string
  text?: string
  image?: RenderFile
  wave?: HeroWave
  blob?: Blob
  border?: boolean
  action?: HeroAction
}
