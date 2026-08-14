/**
 * Schema
 */

/* Imports */

import type { SchemaContent, SchemaRichTextContent } from './schemaTypes.js'
import { z } from 'zod'
import { buttonSchema } from '../objects/Button/ButtonTypes.js'
import { imageSchema } from '../objects/Image/ImageTypes.js'
import { mediaSchema } from '../objects/Media/MediaTypes.js'
import { postsSchema } from '../objects/Posts/PostsTypes.js'
import { formSchema, formFieldSchema } from '../objects/Form/FormTypes.js'
import { heroSchema } from '../components/Hero/HeroTypes.js'
import {
  sizeOption,
  justifyOption,
  alignOption,
  containerOption,
  columnOption,
  backgroundOption,
  blobOption,
  headingStyleOption,
  textStyleOption,
  referenceOption
} from './schemaOptions.js'

/**
 * Inline markup inside a rich text block, such as a list item or a link.
 *
 * @type {z.ZodType<SchemaRichTextContent>}
 */
// Lazy and annotated because it contains itself
const richTextContentSchema: z.ZodType<SchemaRichTextContent> = z.lazy(() => z.object({
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
const richTextSchema = z.object({
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
 * A fixed-proportion box, used to reserve space for media.
 *
 * @type {z.ZodObject}
 */
const aspectRatioSchema = z.object({
  renderType: z.literal('aspectRatio'),
  percent: z
    .number()
    .describe('Height as a percentage of width. 100 is square, 56.25 is sixteen by nine.'),
  content: z
    .lazy(() => z.array(contentSchema))
    .describe('What sits inside the box.')
})

/**
 * A column within a container laid out as a row.
 *
 * @type {z.ZodObject}
 */
const columnSchema = z.object({
  renderType: z.literal('column'),
  width: columnOption
    .optional()
    .describe('Width out of twelve on the narrowest screens.'),
  widthSmall: columnOption
    .optional()
    .describe('Width out of twelve from small screens up.'),
  widthMedium: columnOption
    .optional()
    .describe('Width out of twelve from medium screens up.'),
  widthLarge: columnOption
    .optional()
    .describe('Width out of twelve from large screens up.'),
  justify: justifyOption
    .optional()
    .describe('Where children sit horizontally.'),
  align: alignOption
    .optional()
    .describe('Where children sit vertically.'),
  grow: z
    .boolean()
    .optional()
    .describe('Let the column absorb leftover space.'),
  position: z
    .enum([
      'top-left',
      'top-left-10',
      'top-right',
      'top-right-10',
      'bottom-left',
      'bottom-left-10',
      'bottom-right',
      'bottom-right-10'
    ])
    .optional()
    .describe('Pin the column to a corner of its parent, for overlapping layouts.'),
  widthCustom: z
    .object({
      init: z.number().optional(),
      small: z.number().optional(),
      medium: z.number().optional(),
      large: z.number().optional()
    })
    .optional()
    .describe('Exact widths as percentages, when the twelve column grid is too coarse.'),
  classes: z
    .string()
    .optional()
    .describe('Extra utility classes. Prefer the props above where one exists.'),
  content: z
    .lazy(() => z.array(contentSchema))
    .describe('What sits inside the column.')
})

/**
 * A grouping element carrying spacing, width and layout.
 *
 * @type {z.ZodObject}
 */
const containerSchema = z.object({
  renderType: z.literal('container'),
  tag: z
    .string()
    .optional()
    .describe('HTML tag to render, for example section, ul, dl or figure. Defaults to div.'),
  maxWidth: containerOption
    .optional()
    .describe('Constrain the content to a named max width. Narrower widths suit prose.'),
  layout: z
    .enum(['block', 'col', 'col-s', 'col-m', 'col-l', 'row', 'row-s', 'row-m', 'row-l'])
    .optional()
    .describe('Stacked, column or row. The suffix is the screen size the row starts at.'),
  background: backgroundOption
    .optional()
    .describe('Background color for the whole band.'),
  border: z
    .enum(['rounded', 'full'])
    .optional()
    .describe('Border treatment.'),
  justify: justifyOption
    .optional()
    .describe('Where children sit horizontally.'),
  align: alignOption
    .optional()
    .describe('Where children sit vertically.'),
  gap: sizeOption
    .optional()
    .describe('Space between children.'),
  gapLarge: sizeOption
    .optional()
    .describe('Space between children on large screens.'),
  paddingTop: sizeOption
    .optional()
    .describe('Space above the content.'),
  paddingTopLarge: sizeOption
    .optional()
    .describe('Space above the content on large screens.'),
  paddingBottom: sizeOption
    .optional()
    .describe('Space below the content.'),
  paddingBottomLarge: sizeOption
    .optional()
    .describe('Space below the content on large screens.'),
  paddingLeft: sizeOption
    .optional()
    .describe('Space to the left of the content.'),
  paddingLeftLarge: sizeOption
    .optional()
    .describe('Space to the left of the content on large screens.'),
  paddingRight: sizeOption
    .optional()
    .describe('Space to the right of the content.'),
  paddingRightLarge: sizeOption
    .optional()
    .describe('Space to the right of the content on large screens.'),
  grow: z
    .boolean()
    .optional()
    .describe('Let the container absorb leftover space.'),
  shrink: z
    .boolean()
    .optional()
    .describe('Let the container shrink below its content size. Defaults to true.'),
  breakout: z
    .boolean()
    .optional()
    .describe('Let the content run wider than its parent max width.'),
  richTextStyles: z
    .boolean()
    .optional()
    .describe('Apply prose spacing to the rich text inside. Set this on any container of body copy.'),
  content: z
    .lazy(() => z.union([z.string(), z.array(contentSchema)]))
    .describe('What sits inside the container.')
})

/**
 * Every block a page can contain, tagged by renderType.
 *
 * @type {z.ZodType<SchemaContent>}
 */
// Lazy and annotated because containers hold containers
const contentSchema: z.ZodType<SchemaContent> = z.lazy(() => z.discriminatedUnion('renderType', [
  containerSchema,
  columnSchema,
  aspectRatioSchema,
  richTextSchema,
  imageSchema,
  mediaSchema,
  buttonSchema,
  postsSchema,
  formSchema,
  formFieldSchema
]))

/**
 * Search engine and social sharing overrides.
 *
 * @type {z.ZodObject}
 */
const metaSchema = z.object({
  description: z
    .string()
    .describe('Summary shown in search results and link previews.'),
  image: z
    .string()
    .describe('Media library key for the link preview image.')
})

/**
 * Fields shared by every editable content type.
 *
 * @type {z.ZodObject}
 */
const baseSchema = z.object({
  title: z
    .string()
    .min(1)
    .describe('Title of the page, used in the browser tab, navigation and link previews.'),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers and hyphens only')
    .describe('URL segment for the page. Changing this changes the URL and breaks existing links.'),
  date: z
    .string()
    .describe('When the page was first published, as an ISO date and time.'),
  dateModified: z
    .string()
    .describe('When the page was last changed, as an ISO date and time.'),
  meta: metaSchema
    .optional()
    .describe('Search engine and social sharing overrides.'),
  hero: heroSchema
    .optional()
    .describe('The banner at the top of the page.'),
  blob: blobOption
    .optional()
    .describe('Decorative blob shape behind the hero.'),
  template: z
    .literal('blank')
    .optional()
    .describe('Set to blank to drop the header, footer and hero and center the content on its own.'),
  content: z
    .lazy(() => z.array(contentSchema))
    .describe('The blocks that make up the page, in the order they appear.')
})

/**
 * A marketing page.
 *
 * @type {z.ZodObject}
 */
const pageContentSchema = baseSchema.extend({
  contentType: z.literal('page'),
  archive: z
    .string()
    .optional()
    .describe('Content type this page is the archive for, for example work.')
})

/**
 * A work item — a case study in the portfolio.
 *
 * @type {z.ZodObject}
 */
const workContentSchema = baseSchema.extend({
  contentType: z.literal('work'),
  passwordProtect: z
    .boolean()
    .optional()
    .describe('Put the item behind the site password.'),
  theme: z
    .record(z.string(), z.string())
    .optional()
    .describe('Named colors for this item as hex values, keyed like primary-dark. Referenced as theme-primary.'),
  related: z
    .array(referenceOption)
    .optional()
    .describe('Other work items to surface at the bottom, as contentType--slug.'),
  category: z
    .array(referenceOption)
    .optional()
    .describe('Taxonomy terms this item belongs to, as contentType--slug.')
})

/**
 * Every page the editing tools can read and write.
 *
 * @type {z.ZodDiscriminatedUnion}
 */
const pageSchema = z.discriminatedUnion('contentType', [
  pageContentSchema,
  workContentSchema
])

/* Exports */

export {
  richTextContentSchema,
  richTextSchema,
  aspectRatioSchema,
  columnSchema,
  containerSchema,
  contentSchema,
  metaSchema,
  pageContentSchema,
  workContentSchema,
  pageSchema
}
