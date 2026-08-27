/**
 * Workers - Site
 */

import type { SiteWorkerEnv } from './SiteTypes.js'
import type { WorkerRequest } from '../workerTypes.js'
import { WorkerEntrypoint } from 'cloudflare:workers'
import { workerProtectFilter } from '../workerFilter.js'
import { workerProtectSetup } from '../workerSetup.js'
import { Protect } from '../../components/Protect/Protect.js'

/**
 * Manage site assets and requests.
 */
export default class extends WorkerEntrypoint {
  /**
   * Typed env.
   */
  declare env: SiteWorkerEnv

  /**
   * Route serverless and serve assets.
   * 
   * @param {WorkerRequest} request
   * @return {Promise<Response>}
   */
  override async fetch(request: WorkerRequest): Promise<Response> {
    /* Check serverless */

    const passwordProtect = await workerProtectFilter(request)

    /* Serve assets */

    if (!passwordProtect) {
      return await this.env.ASSETS.fetch(request)
    }

    /* Check password cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')

    if (!!cookie && cookie.includes(`${cookieName}=true`)) {
      return await this.env.ASSETS.fetch(request)
    }

    /* Password page */

    workerProtectSetup(this.env)

    return new Response(Protect(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }
}
