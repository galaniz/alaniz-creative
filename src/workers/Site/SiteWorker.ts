/**
 * Workers - Site
 */

/* Imports */

import type { SiteWorkerEnv } from './SiteTypes.js'
import type { WorkerRequest } from '../workerTypes.js'
import { WorkerEntrypoint } from 'cloudflare:workers'
import { workerServerlessSetup, workerServerlessFilter } from '../workerUtils.js'
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

    const passwordProtect = await workerServerlessFilter(request)

    /* Serve assets */

    if (!passwordProtect) {
      return await this.env.ASSETS.fetch(request)
    }

    /* Check password cookie */

    const cookieName = 'acp_set'
    const cookie = request.headers.get('cookie')

    if (cookie && cookie.includes(`${cookieName}=true`)) {
      return await this.env.ASSETS.fetch(request)
    }

    /* Password page */

    await workerServerlessSetup(this.env)

    return new Response(Protect(), {
      status: 200,
      headers: {
        'Content-Type': 'text/html;charset=UTF-8'
      }
    })
  }
}
