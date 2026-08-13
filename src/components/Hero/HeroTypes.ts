/**
 * Components - Hero Types
 */

/* Imports */

import type { RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ButtonArgs } from '../../objects/Button/ButtonTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { SchemaHero } from '../../schema/schemaTypes.js'

/**
 * The wave shapes a hero can use, taken from the schema so the list is written
 * down once. Adding one there is what makes it available here.
 *
 * @typedef {'one'|'two'|'three'|'four'|'five'} HeroWave
 */
export type HeroWave = NonNullable<SchemaHero['wave']>

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
 * What a hero is rendered from.
 *
 * The fields an editor writes come from the schema, so the two cannot drift.
 * The two named here are the ones the render pipeline resolves on the way in:
 * a media key becomes a file, and a contentType--slug becomes a link. Anything
 * added to that list is a field that changes shape between disk and render.
 *
 * @typedef {object} HeroArgs
 * @extends {Item}
 * @prop {string} [contentType='page']
 * @prop {string} [archive]
 * @prop {RenderFile} [image]
 * @prop {ButtonArgs} [action]
 */
export type HeroArgs =
  Item &
  Omit<SchemaHero, 'image' | 'action'> &
  {
    contentType?: string
    archive?: string
    image?: RenderFile
    action?: ButtonArgs
  }
