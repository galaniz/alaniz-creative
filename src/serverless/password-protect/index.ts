/**
 * Serverless - password protect
 */

/* Imports */

import { setFilters } from '@alanizcreative/static-site-formation/lib/utils/filters'
import { setActions } from '@alanizcreative/static-site-formation/lib/utils/actions'
import httpError from '../../components/http-error'
import protect from '../../components/protect'
import config from '../../config'

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

interface PasswordProtectArgs {
  request: Request
  next: Function
}

const passwordProtect = async ({ request, next }: PasswordProtectArgs): Promise<object> => {
  try {
    /* Check cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')
    const cookieExists: boolean = cookie !== null ? cookie.includes(`${cookieName}=true`) : false

    /* Show page if cookie set otherwise password page */

    if (cookieExists) {
      return next()
    } else {
      setFilters(config.filters)
      setActions(config.actions)

      const html = await protect()

      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8'
        }
      })
    }
  } catch (error: any) {
    console.error(config.console.red, '[AC] Error with password protect function: ', error)

    const statusCode = typeof error.httpStatusCode === 'number' ? error.httpStatusCode : 500

    return new Response(await httpError(500), {
      status: statusCode,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }
}

/* Export */

export default passwordProtect
