/**
 * Workers - Password
 */

/* Imports */

import type { PasswordEnv } from './PasswordTypes.js'
import type { ServerlessAction } from '@alanizcreative/formation-static/serverless/serverlessTypes.js'
import { setConfig } from '@alanizcreative/formation-static/config/config.js'
import { escape } from '@alanizcreative/formation-static/utils/escape/escape.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { setServerless } from '@alanizcreative/formation-static/serverless/serverless.js'
import { Ajax } from '@alanizcreative/formation-static/serverless/Ajax/Ajax.js'
import { workerServerlessTurnstile } from '../workerUtils.js'
import { config } from '../../config/config.js'

/**
 * Escape and check password.
 *
 * @type {ServerlessAction}
 */
const password: ServerlessAction = async (data, request, env: PasswordEnv) => {
  /* Turnstile check */

  await workerServerlessTurnstile(data, request, env)

  /* Password value */

  let password = data.inputs.password?.value

  /* No password */

  if (!isStringStrict(password)) {
    return {
      error: {
        message: 'No credentials',
        code: 400
      }
    }
  }

  /* Wrong password */

  password = escape(password)

  if (password !== env.PASSWORD) {
    return {
      error: {
        message: 'Incorrect credentials',
        code: 400
      }
    }
  }

  /* Success */

  return {
    success: {
      message: 'Correct credentials',
      headers: {
        'Set-Cookie': 'acp_set=true; path=/'
      }
    }
  }
}

/**
 * Manage password validation.
 */
export default {
  /**
   * @param {Request} request
   * @param {PasswordEnv} env
   * @return {Promise<Response>}
   */
  async fetch (request: Request, env: PasswordEnv): Promise<Response> {
    const { headers, method } = request

    /* Check origin */

    const allowedOrigins = env.CF_PASSWORD_ALLOWED_ORIGINS
    const origin = headers.get('Origin')
    const origins = allowedOrigins?.split(',')

    if (!origin || !origins || !origins.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Unauthorized origin' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    /* Cors handling */

    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Origin': origin,
      'Content-Type': 'application/json'
    }

    /* Handle options method (preflight request) */

    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      })
    }

    /* Set up */

    setConfig(config)
    setServerless({ password, 'password-dev': password })

    /* Result */

    return await Ajax(request, env, corsHeaders, 'ac_hp') // Request method checked here
  }
}
