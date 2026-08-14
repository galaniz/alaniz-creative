/**
 * Objects - Image Types
 */

/* Imports */

import type {
  RenderFunctionArgs,
  RenderFile,
  RenderRichText
} from '@alanizcreative/formation-static/render/renderTypes.js'
import type { ConfigAspectRatio, ConfigSize } from '../../config/configTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import {
  sizeOption,
  aspectRatioOption,
  imageKeyOption
} from '../../schema/schemaOptions.js'

/**
 * An image from the media library.
 *
 * @type {z.ZodObject}
 */
export const imageSchema = z.object({
  renderType: z.literal('image'),
  image: imageKeyOption
    .describe('Media library key, for example citris/hero. Upload images in the media library first.'),
  alt: z
    .string()
    .optional()
    .describe('What the image shows, for people who cannot see it. Write one unless the image is purely decorative and the surrounding text already says everything it conveys.'),
  width: sizeOption
    .or(z.literal('full'))
    .optional()
    .describe('Width of the image, or full to fill its column.'),
  widthLarge: sizeOption
    .or(z.literal('full'))
    .optional()
    .describe('Width on large screens, if it differs from width.'),
  aspectRatio: aspectRatioOption
    .optional()
    .describe('Crop the image to a fixed ratio. Leave unset to keep its own proportions.'),
  borderRadius: z
    .enum(['rounded', 'full', 'none'])
    .optional()
    .describe('Corner rounding. Defaults to rounded.'),
  border: z
    .boolean()
    .optional()
    .describe('Draw a border around the image.'),
  contain: z
    .boolean()
    .optional()
    .describe('Fit the whole image inside its box instead of cropping it to fill.')
})

/**
 * @typedef {object} ImageSchema
 * @prop {'image'} renderType
 * @prop {string} image
 * @prop {string} [alt]
 * @prop {ConfigSize|'full'} [width]
 * @prop {ConfigSize|'full'} [widthLarge]
 * @prop {ConfigAspectRatio} [aspectRatio]
 * @prop {'rounded'|'full'|'none'} [borderRadius='rounded']
 * @prop {boolean} [border=false]
 * @prop {boolean} [contain=false]
 */
export type ImageSchema = z.infer<typeof imageSchema>

/**
 * @typedef {object} ImageArgs
 * @prop {RenderFile} [image]
 * @prop {string} [alt]
 * @prop {ConfigAspectRatio} [aspectRatio]
 * @prop {number} [maxWidth]
 * @prop {number} [viewportWidth=80]
 * @prop {string} [sizes]
 * @prop {RenderRichText[]} [caption]
 * @prop {boolean} [lazy=true]
 * @prop {boolean} [border=false]
 * @prop {'rounded'|'full'|'none'} [borderRadius='rounded']
 * @prop {ConfigSize} [width]
 * @prop {ConfigSize} [widthLarge]
 * @prop {boolean} [contain=false]
 * @prop {'center'} [align]
 * @prop {string} [classes]
 */
export interface ImageArgs {
  image?: RenderFile
  alt?: string
  aspectRatio?: ConfigAspectRatio
  maxWidth?: number
  viewportWidth?: number
  sizes?: string
  caption?: RenderRichText[]
  lazy?: boolean
  border?: boolean
  borderRadius?: 'rounded' | 'full' | 'none'
  width?: ConfigSize
  widthLarge?: ConfigSize
  contain?: boolean
  align?: 'center'
  classes?: string
}

/**
 * @typedef {object} ImageProps
 * @extends {RenderFunctionArgs}
 * @prop {ImageArgs} args
 * @prop {Item} [itemData]
 */
export interface ImageProps extends RenderFunctionArgs {
  args: ImageArgs
  itemData?: Item
}
