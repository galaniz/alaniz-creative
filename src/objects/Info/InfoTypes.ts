/**
 * Objects - Info Types
 */

/**
 * @typedef {'error'|'error-summary'|'success'|'neutral'} InfoType
 */
export type InfoType = 'error' | 'error-summary' | 'success' | 'neutral'

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean} [template=false]
 * @prop {InfoType} [type='neutral']
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean
  type?: InfoType
}
