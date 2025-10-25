/**
 * Config - Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} ConfigEnv
 * @extends {Generic}
 * @prop {string} [ENVIRONMENT]
 */
export interface ConfigEnv extends Generic {
  ENVIRONMENT?: string
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
 * @prop {string} in
 * @prop {string} out
 * @prop {string} replace
 * @prop {Map<string, string>} cache
 * @prop {string[]} safelist
 */
export interface ConfigVarsCss {
  in: string
  out: string
  replace: string
  cache: Map<string, string>
  safelist: string[]
}

/**
 * @typedef {object} ConfigVarsJs
 * @prop {string} in
 * @prop {string} out
 */
export interface ConfigVarsJs {
  in: string
  out: string
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
 * @typedef {'background-light'|'foreground-base'|'bright'} ConfigBackgrounds
 */
export type ConfigBackgrounds = 'background-light' | 'foreground-base' | 'bright'

/**
 * @typedef {'0'|'4xs'|'3xs'|'2xs'|'xs'|'s'|'m'|'l'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} ConfigSizes
 */
export type ConfigSizes =
  '0' |
  '4xs' |
  '3xs' |
  '2xs' |
  'xs' |
  's' |
  'm' |
  'l' |
  'xl' |
  '2xl' |
  '3xl' |
  '4xl' |
  '5xl'

/**
 * @typedef {'start'|'center'|'end'|'between'} ConfigJustify
 */
export type ConfigJustify = 'start' | 'center' | 'end' | 'between'

/**
 * @typedef {'start'|'center'|'end'} ConfigAlign
 */
export type ConfigAlign = 'start' | 'center' | 'end'

/**
 * @typedef {'1-1|'16-10'|'16-9'} ConfigAspectRatio
 */
export type ConfigAspectRatio = '1-1' | '16-10' | '16-9'

/**
 * @typedef {0|600|900|1200} ConfigBreakpoint
 */
export type ConfigBreakpoint = 0 | 600 | 900 | 1200

/**
 * @typedef {'default'|'2xl'|'xl'|'l'|'m'|'s'|'xs'} ConfigContainer
 */
export type ConfigContainer = 'default' | '2xl' | 'xl' | 'l' | 'm' | 's' | 'xs'

/**
 * @typedef {'12'|'11'|'10'|'9'|'8'|'7'|'6'|'5'|'4'|'3'|'2'|'1'} ConfigColumn
 */
export type ConfigColumn =
  '12' |
  '11' |
  '10' |
  '9' |
  '8' |
  '7' |
  '6' |
  '5' |
  '4' |
  '3' |
  '2' |
  '1'

/**
 * @typedef {'one'|'two'|'three'|'four'|'five'|'six'} ConfigBlob
 */
export type ConfigBlob = 'one' | 'two' | 'three' | 'four' | 'five' | 'six'

/**
 * @typedef {2|3|4|5|6} ConfigHeadingLevel
 */
export type ConfigHeadingLevel = 2 | 3 | 4 | 5 | 6
