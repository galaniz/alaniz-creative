/**
 * Workers - Types
 */

/**
 * @typedef {object} WorkerEnv
 * @prop {string} [CF_TURNSTILE_KEY]
 */
export interface WorkerEnv {
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
