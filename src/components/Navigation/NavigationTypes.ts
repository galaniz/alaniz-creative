/**
 * Components - Navigation Types
 */

/**
 * @typedef {object} NavigationPrimaryArgs
 * @prop {string} [currentLink]
 * @prop {string|string[]} [currentType]
 */
export interface NavigationPrimaryArgs {
  currentLink?: string
  currentType?: string | string[]
}

/**
 * @typedef {'header'|'footer'} NavigationsLocations
 */
export type NavigationLocations = 'header' | 'footer'
