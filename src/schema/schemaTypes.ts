/**
 * Schema - Types
 */

/* Imports */

import type { z } from 'zod'
import type {
  pageSchema,
  pageContentSchema,
  workContentSchema
} from '../global/globalTypes.js'

/**
 * A single block within a page, tagged by render type.
 *
 * @typedef {object} SchemaContent
 * @prop {string} renderType
 */
// Loose here and exact at run time, where the schema's union decides validity
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
