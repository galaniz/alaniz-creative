/**
 * Objects - Button Types
 */

import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { z } from 'zod'
import { sizeOption, justifyOption } from '../../config/configTypes.js'
import { referenceOption } from '../../schema/schemaOptions.js'

/**
 * @type {z.ZodObject}
 */
export const buttonSchema = z.object({
  renderType: z.literal('button'),
  title: z
    .string()
    .describe('Button label. Say where it goes, for example "Explore all work".'),
  internalLink: referenceOption
    .optional()
    .describe('Page on this site to link to, as contentType--slug. Use this or externalLink.'),
  externalLink: z
    .string()
    .optional()
    .describe('URL outside this site to link to. Use this or internalLink.'),
  type: z
    .enum(['primary', 'secondary'])
    .optional()
    .describe('Visual weight. Defaults to primary.'),
  size: z
    .enum(['m', 'l'])
    .optional()
    .describe('Button size. Defaults to m.'),
  justify: justifyOption
    .optional()
    .describe('Where the button sits horizontally.'),
  richText: z
    .boolean()
    .optional()
    .describe('Set when the button follows prose, so it picks up the surrounding text spacing.'),
  paddingTop: sizeOption
    .optional()
    .describe('Space above the button.'),
  paddingBottom: sizeOption
    .optional()
    .describe('Space below the button.')
})

/**
 * @typedef {object} ButtonSchema
 * @prop {'button'} renderType
 * @prop {string} title
 * @prop {string} [internalLink]
 * @prop {string} [externalLink]
 * @prop {'primary'|'secondary'} [type='primary']
 * @prop {'m'|'l'} [size='m']
 * @prop {ConfigJustify} [justify]
 * @prop {boolean} [richText]
 * @prop {ConfigSize} [paddingTop]
 * @prop {ConfigSize} [paddingBottom]
 */
export type ButtonSchema = z.infer<typeof buttonSchema>

/**
 * @typedef {object} ButtonArgs
 * @extends {ButtonSchema}
 * @prop {string} [title]
 * @prop {InternalLink} [internalLink]
 * @prop {string} [link]
 * @prop {string} [icon]
 */
export type ButtonArgs =
  Omit<ButtonSchema, 'renderType' | 'title' | 'internalLink'> &
  {
    title?: string
    internalLink?: InternalLink
    link?: string
    icon?: string
  }

/**
 * @typedef {object} ButtonProps
 * @extends {RenderFunctionArgs}
 * @prop {ButtonArgs} args
 * @prop {Item} [itemData]
 */
export interface ButtonProps extends RenderFunctionArgs {
  args: ButtonArgs
  itemData?: Item
}
