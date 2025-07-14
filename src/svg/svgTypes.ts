/**
 * Svg - Types
 */

/* Imports */

import type { ConfigSizes } from '../config/configTypes.js'

/**
 * @typedef {object} SvgArgs
 * @prop {ConfigGeometry} [width=20]
 * @prop {ConfigGeometry} [height=20]
 * @prop {string} [classes]
 */
export interface SvgArgs {
  width?: ConfigSizes
  height?: ConfigSizes
  classes?: string
}
