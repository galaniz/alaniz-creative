/**
 * Schema - Types
 */

/* Imports */

import type { z } from 'zod'
import type {
  pageSchema,
  pageContentSchema,
  workContentSchema,
  heroSchema
} from './schema.js'

/**
 * Inline markup inside a rich text block.
 *
 * Written out by hand rather than inferred because it refers to itself, and an
 * inferred recursive type has no base case for the compiler to resolve.
 *
 * @typedef {object} SchemaRichTextContent
 * @prop {string} [tag]
 * @prop {string} [internalLink]
 * @prop {string} [link]
 * @prop {string|SchemaRichTextContent[]} [content]
 */
export interface SchemaRichTextContent {
  tag?: string
  internalLink?: string
  link?: string
  content?: string | SchemaRichTextContent[]
}

/**
 * A single block within a page, tagged by render type.
 *
 * Also written out by hand, for the same reason — containers hold containers.
 * The shape is loose here and exact at run time: the discriminated union in
 * the schema is what decides whether a block is valid.
 *
 * @typedef {object} SchemaContent
 * @prop {string} renderType
 */
export interface SchemaContent {
  renderType: string
  [key: string]: unknown
}

/**
 * @typedef {object} SchemaPage
 */
export type SchemaPage = z.infer<typeof pageSchema>

/**
 * @typedef {object} SchemaPageContent
 */
export type SchemaPageContent = z.infer<typeof pageContentSchema>

/**
 * @typedef {object} SchemaWorkContent
 */
export type SchemaWorkContent = z.infer<typeof workContentSchema>

/**
 * @typedef {object} SchemaHero
 */
export type SchemaHero = z.infer<typeof heroSchema>

/**
 * @typedef {object} SchemaIssue
 * @prop {string} path
 * @prop {string} message
 */
export interface SchemaIssue {
  path: string
  message: string
}

/**
 * @typedef {object} SchemaResult
 * @prop {boolean} valid
 * @prop {SchemaPage} [page]
 * @prop {SchemaIssue[]} issues
 */
export interface SchemaResult {
  valid: boolean
  page?: SchemaPage
  issues: SchemaIssue[]
}
