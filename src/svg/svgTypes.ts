/**
 * Svg - Types
 */

/* Imports */

import type { ConfigSize } from '../config/configTypes.js'

/**
 * @typedef {object} SvgArgs
 * @prop {ConfigGeometry} [width='xs']
 * @prop {ConfigGeometry} [height='xs']
 * @prop {string} [classes]
 */
export interface SvgArgs {
  width?: ConfigSize
  height?: ConfigSize
  classes?: string
}
