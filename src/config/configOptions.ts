/**
 * Config - Options
 */

/* Imports */

import type { ConfigContainer, ConfigBreakpoint, ConfigColumn } from './configTypes.js'

/**
 * Container numbers.
 *
 * @type {Object<ConfigContainer, number>}
 */
export const configContainerNumbers: Record<ConfigContainer, number> = {
  container: 1200
}

/**
 * Breakpoint numbers.
 *
 * @type {ConfigBreakpoint[]}
 */
export const configBreakpointNumbers: ConfigBreakpoint[] = [
  0,
  600,
  900,
  1200
]

/**
 * Column floats.
 *
 * @type {Object<ConfigColumn, number>}
 */
export const configColumnFloats: Record<ConfigColumn, number> = {
  12: 1,
  11: 0.9166,
  10: 0.8333,
  9: 0.75,
  8: 0.6667,
  7: 0.6,
  6: 0.5,
  5: 0.4,
  4: 0.3333,
  3: 0.25,
  2: 0.1666,
  1: 0.0833
}
