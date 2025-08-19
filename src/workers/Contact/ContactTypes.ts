/**
 * Workers - Contact Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} ContactEnv
 * @extends {Generic}
 * @prop {string} [CF_CONTACT_ALLOWED_ORIGINS]
 * @prop {string} [CF_TURNSTILE_KEY]
 * @prop {string} [RESEND_API_KEY]
 */
export interface ContactEnv extends Generic {
  CF_CONTACT_ALLOWED_ORIGINS?: string
  CF_TURNSTILE_KEY?: string
  RESEND_API_KEY?: string
}
