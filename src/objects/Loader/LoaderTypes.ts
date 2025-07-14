/**
 * Objects - Loader Types
 */

/**
 * @typedef {object} LoaderArgs
 * @prop {string} label
 * @prop {'s'} [size]
 * @prop {string} [classes]
 * @prop {boolean} [focusable=true]
 */
export interface LoaderArgs {
  label: string
  size?: 's'
  classes?: string
  focusable?: boolean
}
