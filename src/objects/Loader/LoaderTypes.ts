/**
 * Objects - Loader Types
 */

/**
 * @typedef {object} LoaderArgs
 * @prop {'s'} [size]
 * @prop {string} [classes]
 * @prop {boolean} [focusable=true]
 */
export interface LoaderArgs {
  size?: 's'
  classes?: string
  focusable?: boolean
}
