/**
 * Workers - Types
 */

/* Imports */

import type { IncomingRequestCfProperties } from '@cloudflare/workers-types'
import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'

/**
 * @typedef {object} WorkerEnv
 * @extends {Generic}
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface WorkerEnv extends Generic {
  CF_TURNSTILE_KEY?: string
}

/**
 * @typedef {object} WorkerTurnstile
 * @prop {boolean} success
 */
export interface WorkerTurnstile {
  success: boolean
}

/**
 * @typedef {object} WorkerRequest
 * @extends {Request}
 * @prop {IncomingRequestCfProperties} [cf]
 */
export type WorkerRequest = Request & {
  cf?: IncomingRequestCfProperties
}
