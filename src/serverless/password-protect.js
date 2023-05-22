/**
 * Serverless - password protect
 */

/* Imports */

import { setDataVars } from '../utils'
import httpError from '../render/http-error'
import protect from '../render/protect'

/**
 * Function - check password set before showing page
 *
 * @private
 * @param {object} context
 * @param {object} context.request
 * @param {object} context.env
 * @param {function} context.next
 * @return {object} Response
 */

const passwordProtect = async ({ request, env, next }) => {
  try {
    /* Check cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')

    /* Show page if cookie set otherwise password page */

    if (cookie && cookie.includes(`${cookieName}=true`)) {
      return next()
    } else {
      const html = await protect()

      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html;charset=UTF-8'
        }
      })
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
