/**
 * Text - Rich Text Types
 */

import { z } from 'zod'
import {
  alignOption,
  headingStyleOption,
  textStyleOption
} from '../../config/configTypes.js'
import { referenceOption } from '../../schema/schemaOptions.js'

/**
 * Inline markup inside a rich text block, such as a list item or a link.
 *
 * @typedef {object} RichTextContentSchema
 * @prop {string} [tag]
 * @prop {string} [internalLink]
 * @prop {string} [link]
 * @prop {string|RichTextContentSchema[]} [content]
 */
export interface RichTextContentSchema {
  tag?: string
  internalLink?: string
  link?: string
  content?: string | RichTextContentSchema[]
}

/**
 * Inline markup inside a rich text block.
 *
 * @type {z.ZodType<RichTextContentSchema>}
 */
// Lazy and annotated because it contains itself
export const richTextContentSchema: z.ZodType<RichTextContentSchema> = z.lazy(() => z.object({
  tag: z
    .string()
    .optional()
    .describe('HTML tag for this fragment, for example li, a, dt, dd, cite or strong.'),
  internalLink: referenceOption
    .optional()
    .describe('Link to another page on this site, as contentType--slug.'),
  link: z
    .string()
    .optional()
    .describe('Link to a URL outside this site. Use internalLink for pages on this site.'),
  content: z
    .union([z.string(), z.array(richTextContentSchema)])
    .optional()
    .describe('Text for this fragment, or nested fragments for lists and tables.')
}))

/**
 * A block of prose — a heading, paragraph, list or quote.
 *
 * @type {z.ZodObject}
 */
export const richTextSchema = z.object({
  renderType: z.literal('richText'),
  tag: z
    .string()
    .optional()
    .describe('HTML tag to render, for example p, h2, h3, ul, blockquote or dl. Defaults to p.'),
  type: z
    .enum(['normal', 'columns'])
    .optional()
    .describe('Set to columns to lay a list out in two columns, or normal to drop heading styling.'),
  headingStyle: headingStyleOption
    .optional()
    .describe('Visual heading size, set independently of the tag so heading order stays correct.'),
  textStyle: textStyleOption
    .or(headingStyleOption)
    .optional()
    .describe('Visual text size. A heading size here styles body text without making it a heading.'),
  align: alignOption
    .optional()
    .describe('Text alignment.'),
  color: z
    .string()
    .regex(/^theme-[a-z0-9-]+$/, 'Must be a theme color such as theme-primary')
    .optional()
    .describe('Theme color for this text, as theme- plus a key from the page theme, e.g. theme-primary.'),
  content: z
    .union([z.string(), z.array(richTextContentSchema)])
    .describe('The text itself. A plain string for a single tag, or fragments for lists and tables.')
})

/**
 * @typedef {object} RichTextSchema
 * @prop {'richText'} renderType
 * @prop {string} [tag='p']
 * @prop {'normal'|'columns'} [type]
 * @prop {ConfigHeadingStyle} [headingStyle]
 * @prop {ConfigTextStyle|ConfigHeadingStyle} [textStyle]
 * @prop {ConfigAlign} [align]
 * @prop {string} [color]
 * @prop {string|RichTextContentSchema[]} content
 */
export type RichTextSchema = z.infer<typeof richTextSchema>
