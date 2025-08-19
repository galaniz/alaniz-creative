/**
 * Svg - Types
 */

/* Imports */

import type { ConfigSizes } from '../config/configTypes.js'

/**
 * @typedef {object} SvgArgs
 * @prop {ConfigGeometry} [width='xs']
 * @prop {ConfigGeometry} [height='xs']
 * @prop {string} [classes]
 */
export interface SvgArgs {
  width?: ConfigSizes
  height?: ConfigSizes
  classes?: string
}
