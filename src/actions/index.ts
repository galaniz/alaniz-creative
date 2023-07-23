/**
 * Actions
 */

/* Imports */

import getPathDepth from '@alanizcreative/static-site-formation/lib/utils/get-path-depth'
import config from '../config'

/**
 * Site actions on render
 *
 * @type {object}
 */

const actions: { [key: string]: Function } = {
  renderItemEnd (args: FRM.RenderItemEndActionArgs): void {
    const { slug = '', props } = args
    const { passwordProtected = false } = props

    if (passwordProtected === true && slug !== '') {
      if (config.serverless.routes.passwordProtect === undefined) {
        config.serverless.routes.passwordProtect = []
      }

      const path = `${slug.replace(/^\/|\/$/gm, '')}/_middleware.js`

      config.serverless.routes.passwordProtect.push({
        path,
        content: `import passwordProtect from '${getPathDepth(`${config.serverless.dir}/${path}`)}src/serverless/password-protect'\nconst protect = async ({ request, env, next }) => { return await passwordProtect({ request, env, next }) }\nexport const onRequestGet = [protect]\n`
      })
    }
  }
}

/* Exports */

export default actions
