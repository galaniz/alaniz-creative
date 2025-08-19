/**
 * Workers - Password Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} PasswordEnv
 * @extends {Generic}
 * @prop {string} [CF_PASSWORD]
 * @prop {string} [CF_PASSWORD_ALLOWED_ORIGINS]
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface PasswordEnv extends Generic {
  CF_PASSWORD?: string
  CF_PASSWORD_ALLOWED_ORIGINS?: string
  CF_TURNSTILE_KEY?: string
}
