/**
 * Serverless - password protect
 */

/* Imports */

import { setDataVars } from '../utils'
import httpError from '../render/http-error'

/**
 * Function - check password set before showing page
 *
 * @private
 * @param {object} {
 *  @prop {object} request
 *  @prop {object} env
 *  @prop {function} next
 * }
 * @return {object} Response
 */

const passwordProtect = async ({ request, env, next }) => {
  try {
    /* Check cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')

    if (cookie && cookie.includes(`${cookieName}=true`)) {
      return next()
    } else {
      // return env.ASSETS.fetch(url)
    }
  } catch (error) {
    console.error('Error with password protect function: ', error)

    setDataVars(env)

    return new Response(httpError('500'), {
      status: error.httpStatusCode || 500
    })
  }
}

/* Export */

export default passwordProtect
