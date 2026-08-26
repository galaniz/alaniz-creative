/**
 * Schema - Options
 */

import { z } from 'zod'

/**
 * Reference to another content file, as `contentType--slug`.
 *
 * @type {z.ZodString}
 */
const referenceOption = z
  .string()
  .regex(
    /^[a-z][a-zA-Z]*--[a-z0-9-]+$/,
    'Must reference another content file as contentType--slug, for example page--contact'
  )

/**
 * Key of an image in the media library, without a file extension.
 *
 * @type {z.ZodString}
 */
const imageKeyOption = z
  .string()
  .regex(
    /^[a-z0-9][a-z0-9/-]*$/,
    'Must be a media library key such as citris/hero, lowercase with no file extension'
  )

export {
  referenceOption,
  imageKeyOption
}
