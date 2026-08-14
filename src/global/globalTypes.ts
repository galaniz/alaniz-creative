/**
 * Global - Types
 */

/* Imports */

import type { InternalLink } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { HeroArgs } from '../components/Hero/HeroTypes.js'
import type { SchemaWorkContent } from '../schema/schemaTypes.js'
import { z } from 'zod'
import { contentSchema } from '../schema/schema.js'
import { heroSchema } from '../components/Hero/HeroTypes.js'
import { blobOption } from '../config/configTypes.js'
import { referenceOption } from '../schema/schemaOptions.js'

/**
 * Search engine and social sharing overrides.
 *
 * @type {z.ZodObject}
 */
export const metaSchema = z.object({
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
export const baseSchema = z.object({
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
 * A standalone page.
 *
 * @type {z.ZodObject}
 */
export const pageContentSchema = baseSchema.extend({
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
export const workContentSchema = baseSchema.extend({
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
export const pageSchema = z.discriminatedUnion('contentType', [
  pageContentSchema,
  workContentSchema
])

/**
 * The fields an interface declares, minus the index signature it inherits.
 *
 * @typedef {object} Declared
 */
// RenderItem extends Generic, so without this an undeclared field reads as
// unknown instead of failing, and a field dropped from the schema goes unnoticed
type Declared<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

/**
 * A page as the renderer receives it.
 *
 * @typedef {object} Item
 * @extends {RenderItem}
 * @prop {HeroArgs} [hero]
 * @prop {Item[]} [related]
 * @prop {InternalLink[]} [category]
 */
// Work is the wider content type — archive, the one field only a page has, is
// already on RenderItem. The three below are resolved before rendering
export type Item =
  Declared<RenderItem> &
  Partial<Omit<SchemaWorkContent, 'contentType' | 'content' | 'meta' | 'hero' | 'related' | 'category'>> &
  {
    hero?: HeroArgs
    related?: Item[]
    category?: InternalLink[]
  }
