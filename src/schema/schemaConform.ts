/**
 * Schema - Conform
 *
 * A compile time check that the editing schema covers every field this site
 * adds to a render item.
 */

/* Imports */

import type { RenderItem } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../global/globalTypes.js'
import type { SchemaPageContent, SchemaWorkContent } from './schemaTypes.js'

/**
 * The fields an interface declares, minus the index signature it inherits.
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
 * @typedef {never} Conforms
 */
// The error names the missing field: add it to the schema, or to Item
type Conforms<T extends never> = T

/* Exports */

export type SchemaConforms = Conforms<UnmappedField>
