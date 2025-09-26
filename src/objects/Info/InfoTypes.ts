/**
 * Objects - Info Types
 */

/**
 * @typedef {object} InfoArgs
 * @prop {string} [title]
 * @prop {string} [text]
 * @prop {boolean} [template]
 * @prop {'error'|'success'|'neutral'} [type='neutral']
 */
export interface InfoArgs {
  title?: string
  text?: string
  template?: boolean
  type: 'error' | 'success' | 'neutral'
}
