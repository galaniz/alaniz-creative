/**
 * Components - Hero Types
 */

import type { RenderFile } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ButtonArgs } from '../../objects/Button/ButtonTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { buttonSchema } from '../../objects/Button/ButtonTypes.js'
import { blobOption } from '../../config/configTypes.js'
import { imageKeyOption } from '../../schema/schemaOptions.js'

const heroWaveOption = z.enum([
  'one',
  'two',
  'three',
  'four',
  'five'
])

const heroTypeOption = z.enum([
  'media-text',
  'minimal',
  'profile',
  'error'
])

export const heroBaseSchema = z.object({
  type: heroTypeOption
    .optional()
    .describe('Hero treatment. minimal is text only, profile pairs text with a portrait.'),
  title: z
    .string()
    .optional()
    .describe('Hero heading. Falls back to the page title when unset.'),
  text: z
    .string()
    .optional()
    .describe('A sentence or two below the heading.'),
  wave: heroWaveOption
    .optional()
    .describe('Decorative wave shape below the hero.'),
  blob: blobOption
    .optional()
    .describe('Decorative blob shape behind the hero.'),
  border: z
    .boolean()
    .optional()
    .describe('Draw a border around the hero image.')
})

export const heroSchema = heroBaseSchema.extend({
  image: imageKeyOption
    .optional()
    .describe('Media library key for the hero image.'),
  action: buttonSchema
    .omit({ renderType: true })
    .optional()
    .describe('A single call to action button in the hero.')
})

/**
 * @typedef {object} Hero
 * @prop {HeroType} [type='media-text']
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {HeroWave} [wave]
 * @prop {ConfigBlob} [blob]
 * @prop {boolean} [border=false]
 */
export type Hero = z.infer<typeof heroBaseSchema>

/**
 * @typedef {'media-text'|'minimal'|'profile'|'error'} HeroType
 */
export type HeroType = NonNullable<Hero['type']>

/**
 * @typedef {'one'|'two'|'three'|'four'|'five'} HeroWave
 */
export type HeroWave = NonNullable<Hero['wave']>

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
 * @typedef {object} HeroSchema
 * @extends {Hero}
 * @prop {string} [image]
 * @prop {ButtonSchema} [action]
 */
export type HeroSchema = z.infer<typeof heroSchema>

/**
 * @typedef {object} HeroArgs
 * @extends {Item}
 * @extends {Hero}
 * @prop {RenderFile} [image]
 * @prop {ButtonArgs} [action]
 */
export type HeroArgs = Item & Hero & {
  image?: RenderFile
  action?: ButtonArgs
}
