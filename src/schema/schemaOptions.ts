/**
 * Schema - Options
 */

/* Imports */

import { z } from 'zod'

/**
 * Spacing scale shared by padding, gap and width props.
 *
 * @type {z.ZodEnum}
 */
const sizeOption = z.enum([
  '0',
  '4xs',
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl'
])

/**
 * Horizontal distribution of children.
 *
 * @type {z.ZodEnum}
 */
const justifyOption = z.enum([
  'start',
  'center',
  'end',
  'between'
])

/**
 * Cross axis alignment of children.
 *
 * @type {z.ZodEnum}
 */
const alignOption = z.enum([
  'start',
  'center',
  'end'
])

/**
 * Named max widths a container can be constrained to.
 *
 * @type {z.ZodEnum}
 */
const containerOption = z.enum([
  'default',
  '2xl',
  'xl',
  'l',
  'm',
  's',
  'xs'
])

/**
 * Column widths out of a twelve column grid.
 *
 * @type {z.ZodEnum}
 */
const columnOption = z.enum([
  '12',
  '11',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1'
])

/**
 * Background colors a container can be painted with.
 *
 * @type {z.ZodEnum}
 */
const backgroundOption = z.enum([
  'background-light',
  'foreground-base',
  'bright'
])

/**
 * Decorative blob shapes behind a hero.
 *
 * @type {z.ZodEnum}
 */
const blobOption = z.enum([
  'one',
  'two',
  'three',
  'four',
  'five',
  'six'
])

/**
 * Decorative wave shapes below a hero.
 *
 * @type {z.ZodEnum}
 */
const waveOption = z.enum([
  'one',
  'two',
  'three',
  'four',
  'five'
])

/**
 * Heading level cards in a posts list start at.
 *
 * @type {z.ZodEnum}
 */
const headingLevelOption = z.literal([
  2,
  3,
  4,
  5,
  6
])

/**
 * Fixed aspect ratios an image can be cropped to.
 *
 * @type {z.ZodEnum}
 */
const aspectRatioOption = z.enum([
  '1-1',
  '16-10',
  '16-9'
])

/**
 * Preset heading sizes, independent of heading level.
 *
 * @type {z.ZodEnum}
 */
const headingStyleOption = z.enum([
  'heading-3xl',
  'heading-2xl',
  'heading-xl',
  'heading-l',
  'heading-m',
  'heading-s',
  'heading-xs',
  'heading-2xs'
])

/**
 * Preset body text sizes.
 *
 * @type {z.ZodEnum}
 */
const textStyleOption = z.enum([
  'text-l',
  'text-m',
  'text-s',
  'text-xs'
])

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

/* Exports */

export {
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
}
