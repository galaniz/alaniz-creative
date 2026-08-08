/**
 * Workers - Snapshot
 */

import type { SnapshotEnv } from './SnapshotTypes.js'
import type { WorkerRequest } from '../workerTypes.js'
import { workerServerlessSetup } from '../workerUtils.js'
import { Protect } from '../../components/Protect/Protect.js'

/**
 * Serve password protected static site snapshots from R2 storage.
 */
export default {
  /**
   * @param {WorkerRequest} request
   * @param {SnapshotEnv} env
   * @return {Promise<Response>}
   */
  async fetch (request: WorkerRequest, env: SnapshotEnv): Promise<Response> {
    const { headers, url } = request
    const robotsHeaders = {
      'X-Robots-Tag': 'noindex, nofollow, noarchive'
    }

    /* Check password cookie */

    const cookieName = 'acp_set'
    const cookie = headers.get('cookie')
    const hasAuth = !!cookie && cookie.includes(`${cookieName}=true`)

    /* Password page */

    if (!hasAuth) {
      await workerServerlessSetup(env)

      return new Response(Protect(), {
        status: 200,
        headers: {
          ...robotsHeaders,
          'Content-Type': 'text/html;charset=UTF-8'
        }
      })
    }

    /* Resolve R2 key from pathname */

    const { pathname } = new URL(url)
    let key = pathname.replace('/snapshot/', '')

    /* Resolve extensionless paths to index.html */

    if (key === '' || key.endsWith('/')) {
      key += 'index.html'
    } else if (!key.includes('.')) {
      key += '/index.html'
    }

    /* Fetch file */

    const object = await env.SNAPSHOT_BUCKET.get(key)

    if (!object) {
      return new Response('Not found', {
        status: 404,
        headers: robotsHeaders
      })
    }

    const responseHeaders = new Headers(robotsHeaders)

    object.writeHttpMetadata(responseHeaders)
    responseHeaders.set('etag', object.httpEtag)
    responseHeaders.set('Cache-Control', 'private, no-store')

    return new Response(object.body as BodyInit, { headers: responseHeaders })
  }
}
