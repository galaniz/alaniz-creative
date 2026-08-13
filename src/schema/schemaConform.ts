/**
 * Schema - Conform
 *
 * A compile time check that the editing schema covers every field this site
 * adds to a render item. Nothing here runs — it exists so that adding a field
 * to Item without adding it to the schema fails the build, rather than being
 * silently stripped out of a page the moment an editor saves it.
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../global/globalTypes.js'
import type { SchemaPageContent, SchemaWorkContent } from './schemaTypes.js'

/**
 * The fields an interface actually declares.
 *
 * Item inherits an index signature — RenderItem extends Generic, which is
 * Record<string, unknown> — so keyof Item is string and says nothing about
 * what a page may contain. Dropping the index signature leaves the keys that
 * were written down on purpose.
 *
 * @typedef {object} Declared
 */
type Declared<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
}

/**
 * Fields this site adds on top of a render item.
 *
 * @typedef {string} ItemField
 */
type ItemField = Exclude<keyof Declared<Item>, keyof Declared<RenderItem>>

/**
 * Fields an editor can write, across both content types.
 *
 * @typedef {string} SchemaField
 */
type SchemaField = keyof SchemaPageContent | keyof SchemaWorkContent

/**
 * Fields the renderer knows about and the schema does not.
 *
 * @typedef {never} UnmappedField
 */
type UnmappedField = Exclude<ItemField, SchemaField>

/**
 * Fail unless there are none.
 *
 * The error names the missing field: add it to the schema, or to Item's list
 * of fields the renderer sets for itself.
 *
 * @typedef {never} Conforms
 */
type Conforms<T extends never> = T

/* Exports */

export type SchemaConforms = Conforms<UnmappedField>
