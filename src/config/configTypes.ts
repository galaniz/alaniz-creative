/**
 * Config - Types
 */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import { z } from 'zod'

/**
 * @typedef {object} ConfigEnv
 * @extends {Generic}
 * @prop {string} [ENVIRONMENT]
 * @prop {string} [LOCAL]
 */
export interface ConfigEnv extends Generic {
  ENVIRONMENT?: string
  LOCAL?: string
}

/**
 * @typedef {object} ConfigVarsSvg
 * @prop {string} viewBox
 * @prop {string} output
 */
export interface ConfigVarsSvg {
  viewBox: string
  output: string
}

/**
 * @typedef {object} ConfigVarsCss
 * @prop {string} globalIn
 * @prop {string} globalOut
 * @prop {string} replace
 * @prop {Map<string, string>} cache
 * @prop {string[]} safelist
 */
export interface ConfigVarsCss {
  globalIn: string
  globalOut: string
  replace: string
  cache: Map<string, string>
  safelist: string[]
}

/**
 * @typedef {object} ConfigVarsJs
 * @prop {string} globalIn
 * @prop {string} globalOut
 */
export interface ConfigVarsJs {
  globalIn: string
  globalOut: string
}

/**
 * @typedef {object} ConfigVars
 * @prop {boolean} local
 * @prop {Map<string, ConfigVarsSvg>} svg
 * @prop {Map<string, string>} template
 * @prop {Set<string>} style
 * @prop {Set<string>} noscript
 * @prop {ConfigVarsCss} css
 * @prop {ConfigVarsJs} js
 * @prop {string} formId
 */
export interface ConfigVars {
  local: boolean
  svg: Map<string, ConfigVarsSvg>
  template: Map<string, string>
  style: Set<string>
  noscript: Set<string>
  css: ConfigVarsCss
  js: ConfigVarsJs
  formId: string
}

/**
 * Background colors a container can be painted with.
 *
 * @type {z.ZodEnum}
 */
export const backgroundOption = z.enum([
  'background-light',
  'foreground-base',
  'bright'
])

/**
 * @typedef {'background-light'|'foreground-base'|'bright'} ConfigBackgroundColor
 */
export type ConfigBackgroundColor = z.infer<typeof backgroundOption>

/**
 * Spacing scale shared by padding, gap and width props.
 *
 * @type {z.ZodEnum}
 */
export const sizeOption = z.enum([
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
 * @typedef {'0'|'4xs'|'3xs'|'2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} ConfigSize
 */
export type ConfigSize = z.infer<typeof sizeOption>

/**
 * Horizontal distribution of children.
 *
 * @type {z.ZodEnum}
 */
export const justifyOption = z.enum([
  'start',
  'center',
  'end',
  'between'
])

/**
 * @typedef {'start'|'center'|'end'|'between'} ConfigJustify
 */
export type ConfigJustify = z.infer<typeof justifyOption>

/**
 * Cross axis alignment of children.
 *
 * @type {z.ZodEnum}
 */
export const alignOption = z.enum([
  'start',
  'center',
  'end'
])

/**
 * @typedef {'start'|'center'|'end'} ConfigAlign
 */
export type ConfigAlign = z.infer<typeof alignOption>

/**
 * Fixed aspect ratios an image can be cropped to.
 *
 * @type {z.ZodEnum}
 */
export const aspectRatioOption = z.enum([
  '1-1',
  '16-10',
  '16-9'
])

/**
 * @typedef {'1-1'|'16-10'|'16-9'} ConfigAspectRatio
 */
export type ConfigAspectRatio = z.infer<typeof aspectRatioOption>

/**
 * @typedef {0|600|900|1200} ConfigBreakpoint
 */
export type ConfigBreakpoint = 0 | 600 | 900 | 1200

/**
 * Named max widths a container can be constrained to.
 *
 * @type {z.ZodEnum}
 */
export const containerOption = z.enum([
  'default',
  '2xl',
  'xl',
  'l',
  'm',
  's',
  'xs'
])

/**
 * @typedef {'default'|'2xl'|'xl'|'l'|'m'|'s'|'xs'} ConfigContainer
 */
export type ConfigContainer = z.infer<typeof containerOption>

/**
 * Column widths out of a twelve column grid.
 *
 * @type {z.ZodEnum}
 */
export const columnOption = z.enum([
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
 * @typedef {'12'|'11'|'10'|'9'|'8'|'7'|'6'|'5'|'4'|'3'|'2'|'1'} ConfigColumn
 */
export type ConfigColumn = z.infer<typeof columnOption>

/**
 * Decorative blob shapes behind a hero.
 *
 * @type {z.ZodEnum}
 */
export const blobOption = z.enum([
  'one',
  'two',
  'three',
  'four',
  'five',
  'six'
])

/**
 * @typedef {'one'|'two'|'three'|'four'|'five'|'six'} ConfigBlob
 */
export type ConfigBlob = z.infer<typeof blobOption>

/**
 * Heading level cards in a posts list start at.
 *
 * @type {z.ZodLiteral}
 */
export const headingLevelOption = z.literal([
  2,
  3,
  4,
  5,
  6
])

/**
 * @typedef {2|3|4|5|6} ConfigHeadingLevel
 */
export type ConfigHeadingLevel = z.infer<typeof headingLevelOption>

/**
 * Preset heading sizes, independent of heading level.
 *
 * @type {z.ZodEnum}
 */
export const headingStyleOption = z.enum([
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
 * @typedef {'heading-3xl'|'heading-2xl'|'heading-xl'|'heading-l'|'heading-m'|'heading-s'|'heading-xs'|'heading-2xs'} ConfigHeadingStyle
 */
export type ConfigHeadingStyle = z.infer<typeof headingStyleOption>

/**
 * Preset body text sizes.
 *
 * @type {z.ZodEnum}
 */
export const textStyleOption = z.enum([
  'text-l',
  'text-m',
  'text-s',
  'text-xs'
])

/**
 * @typedef {'text-l'|'text-m'|'text-s'|'text-xs'} ConfigTextStyle
 */
export type ConfigTextStyle = z.infer<typeof textStyleOption>
