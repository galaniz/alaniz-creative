/**
 * Objects - Media Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'

/**
 * A video from the media library, with a title used as its accessible name.
 *
 * @type {z.ZodObject}
 */
export const mediaSchema = z.object({
  renderType: z.literal('media'),
  source: z
    .string()
    .describe('Video file path in the media library, for example latercon/default.mp4.'),
  title: z
    .string()
    .min(1)
    .describe('What the video shows, for people who cannot see it. Always required.')
})

/**
 * @typedef {object} MediaSchema
 * @prop {'media'} renderType
 * @prop {string} source
 * @prop {string} title
 */
export type MediaSchema = z.infer<typeof mediaSchema>

/**
 * @typedef {object} MediaArgs
 * @prop {string} [title]
 * @prop {string} [source]
 */
export type MediaArgs = Partial<Omit<MediaSchema, 'renderType'>>

/**
 * @typedef {object} MediaProps
 * @extends {RenderFunctionArgs}
 * @prop {MediaArgs} args
 * @prop {Item} [itemData]
 */
export interface MediaProps extends RenderFunctionArgs {
  args: MediaArgs
  itemData?: Item
}
