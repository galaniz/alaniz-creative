/**
 * Layouts - Aspect Ratio Types
 */

/* Imports */

import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { contentSchema } from '../../schema/schema.js'

/**
 * A fixed-proportion box, used to reserve space for media.
 *
 * @type {z.ZodObject}
 */
export const aspectRatioSchema = z.object({
  renderType: z.literal('aspectRatio'),
  percent: z
    .number()
    .describe('Height as a percentage of width. 100 is square, 56.25 is sixteen by nine.'),
  content: z
    .lazy(() => z.array(contentSchema))
    .describe('What sits inside the box.')
})

/**
 * @typedef {object} AspectRatioSchema
 * @prop {'aspectRatio'} renderType
 * @prop {number} percent
 * @prop {SchemaContent[]} content
 */
export type AspectRatioSchema = z.infer<typeof aspectRatioSchema>

/**
 * @typedef {object} AspectRatioArgs
 * @prop {number} [percent=100]
 */
export interface AspectRatioArgs {
  percent?: number
}

/**
 * @typedef {object} AspectRatioProps
 * @extends {RenderFunctionArgs}
 * @prop {AspectRatioArgs} args
 * @prop {Item} [itemData]
 */
export interface AspectRatioProps extends RenderFunctionArgs {
  args: AspectRatioArgs
  itemData?: Item
}
