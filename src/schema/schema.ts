/**
 * Schema
 */

/* Imports */

import type { SchemaContent, SchemaRichTextContent } from './schemaTypes.js'
import { z } from 'zod'
import {
  sizeOption,
  justifyOption,
  alignOption,
  containerOption,
  columnOption,
  backgroundOption,
  blobOption,
  waveOption,
  headingLevelOption,
  aspectRatioOption,
  headingStyleOption,
  textStyleOption,
  referenceOption,
  imageKeyOption
} from './schemaOptions.js'

/**
 * Inline markup inside a rich text block, such as a list item or a link.
 *
 * Wrapped in `z.lazy` and annotated because it contains itself. The annotation
 * gives the compiler the base case it cannot infer, and the laziness defers
 * building the schema until the reference it needs exists.
 *
 * @type {z.ZodType<SchemaRichTextContent>}
 */
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
 * A block of prose. The workhorse of the site — headings, paragraphs, lists
 * and quotes are all rich text with a different tag.
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
 * An image from the media library.
 *
 * @type {z.ZodObject}
 */
const imageSchema = z.object({
  renderType: z.literal('image'),
  image: imageKeyOption
    .describe('Media library key, for example citris/hero. Upload images in the media library first.'),
  alt: z
    .string()
    .min(1)
    .describe('What the image shows, for people who cannot see it. Always required.'),
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
 * A video from the media library, with a title used as its accessible name.
 *
 * @type {z.ZodObject}
 */
const mediaSchema = z.object({
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
 * A link styled as a button.
 *
 * @type {z.ZodObject}
 */
const buttonSchema = z.object({
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
 * An automatic list of the most recent items of a content type.
 *
 * @type {z.ZodObject}
 */
const postsSchema = z.object({
  renderType: z.literal('posts'),
  contentType: z
    .string()
    .describe('Content type to list, for example work.'),
  display: z
    .number()
    .int()
    .describe('How many items to show. Use -1 for all of them.'),
  order: z
    .enum(['date', 'title'])
    .optional()
    .describe('Sort order. Defaults to date, newest first.'),
  headingLevel: headingLevelOption
    .optional()
    .describe('Heading level for each card title. Pick the one that keeps the page outline correct.'),
  layout: z
    .enum(['text', 'minimal', 'alternate', 'cascade'])
    .optional()
    .describe('How the list is arranged.')
})

/**
 * A single field in a contact form.
 *
 * @type {z.ZodObject}
 */
const formFieldSchema = z.object({
  renderType: z.literal('formField'),
  name: z
    .string()
    .describe('Field name submitted with the form, for example email.'),
  label: z
    .string()
    .describe('Visible label for the field.'),
  type: z
    .enum(['text', 'email', 'tel', 'number', 'textarea', 'checkbox', 'radio', 'select'])
    .optional()
    .describe('Input type. Defaults to text.'),
  required: z
    .boolean()
    .optional()
    .describe('Whether the field must be filled in.'),
  rows: z
    .number()
    .int()
    .optional()
    .describe('Visible rows, for a textarea.'),
  emptyError: z
    .string()
    .optional()
    .describe('Message shown when a required field is left empty.'),
  invalidError: z
    .string()
    .optional()
    .describe('Message shown when the value is the wrong shape, for example a malformed email.')
})

/**
 * A contact form and the message shown once it is sent.
 *
 * @type {z.ZodObject}
 */
const formSchema = z.object({
  renderType: z.literal('form'),
  successTitle: z
    .string()
    .describe('Heading shown after the form is sent.'),
  successText: z
    .string()
    .describe('Message shown after the form is sent.'),
  toEmail: z
    .string()
    .describe('Address submissions are delivered to.'),
  senderEmail: z
    .string()
    .describe('Address submissions are sent from. Must be on a verified domain.'),
  content: z
    .array(formFieldSchema)
    .describe('The fields in the form, in the order they appear.')
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
 * A grouping element. Containers carry the page's spacing, width and layout,
 * and nest inside one another.
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
 * Every block a page can contain, tagged by renderType. The tag picks both the
 * validation branch and the component that renders it.
 *
 * Lazy and annotated for the same reason as rich text — containers hold
 * containers. The union is built on first use, once the schemas above exist.
 *
 * @type {z.ZodType<SchemaContent>}
 */
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
 * The banner at the top of a page.
 *
 * @type {z.ZodObject}
 */
const heroSchema = z.object({
  type: z
    .enum(['media-text', 'minimal', 'profile', 'error'])
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
  image: imageKeyOption
    .optional()
    .describe('Media library key for the hero image.'),
  wave: waveOption
    .optional()
    .describe('Decorative wave shape below the hero.'),
  blob: blobOption
    .optional()
    .describe('Decorative blob shape behind the hero.'),
  border: z
    .boolean()
    .optional()
    .describe('Draw a border around the hero image.'),
  action: buttonSchema
    .omit({ renderType: true })
    .optional()
    .describe('A single call to action button in the hero.')
})

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
  imageSchema,
  mediaSchema,
  buttonSchema,
  postsSchema,
  formFieldSchema,
  formSchema,
  aspectRatioSchema,
  columnSchema,
  containerSchema,
  contentSchema,
  heroSchema,
  metaSchema,
  pageContentSchema,
  workContentSchema,
  pageSchema
}
