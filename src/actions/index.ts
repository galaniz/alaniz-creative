/**
 * Actions
 */

/* Imports */

import { addAction, resetActions } from '@alanizcreative/static-site-formation/src/utils/actions'
import getPathDepth from '@alanizcreative/static-site-formation/src/utils/get-path-depth'
import config from '../config'

/**
 * Function - actions on render
 *
 * @return {void}
 */

const actions = (): void => {
  /* Reset */

  resetActions()

  /* Render end */

  addAction('renderEnd', (args: FRM.RenderEndActionArgs): void => {
    const { slug = '', props } = args
    const { passwordProtected = false } = props

    if (passwordProtected === true && slug !== '') {
      if (config.serverless.routes.passwordProtect === undefined) {
        config.serverless.routes.passwordProtect = []
      }

      const path = `${slug.replace(/^\/|\/$/gm, '')}/_middleware.js`

      config.serverless.routes.passwordProtect.push({
        path,
        content: `import passwordProtect from '${getPathDepth(`${config.serverless.dir}/${path}`)}src/serverless/password-protect'; const protect = async ({ request, env, next }) => { return await passwordProtect({ request, env, next }) }; export const onRequestGet = [protect];`
      })
    }
  })
}

/* Exports */

export default actions
