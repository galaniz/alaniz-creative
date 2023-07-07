/**
 * Serverless - password protect
 */

/* Imports */

import httpError from '../../components/http-error'
import protect from '../../components/protect'

/**
 * Function - check password set before showing page
 *
 * @private
 * @param {object} args
 * @param {object} args.request
 * @param {object} args.env
 * @param {function} args.next
 * @return {object} Response
 */

interface Args {
  request: any
  next: Function
}

const passwordProtect = async ({ request, next }: Args): Promise<object> => {
  try {
    /* Check cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')
    const cookieExists: boolean = cookie !== null ? cookie.includes(`${cookieName}=true`) : false

    /* Show page if cookie set otherwise password page */

    if (cookieExists) {
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

    const statusCode = typeof error.httpStatusCode === 'number' ? error.httpStatusCode : 500

    return new Response(await httpError(500), {
      status: statusCode
    })
  }
}

/* Export */

export default passwordProtect
