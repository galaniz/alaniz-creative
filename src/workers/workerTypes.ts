/**
 * Workers - Types
 */

/* Imports */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} WorkerEnv
 * @extends {Generic}
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface WorkerEnv extends Generic {
  CF_TURNSTILE_KEY?: string
}
