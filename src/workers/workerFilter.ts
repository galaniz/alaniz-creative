/**
 * Worker - Filter
 */

import type { WorkerRequest } from './workerTypes.js'
import type { StoreServerless } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Filter worker responses for password protection.
 *
 * @param {WorkerRequest} request
 * @return {Promise<boolean>}
 */
const workerProtectFilter = async (request: WorkerRequest): Promise<boolean> => {
  const { url } = request
  const { pathname } = new URL(url)

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: serverless } = await import('../../lib/store/serverless.json') as { default: StoreServerless<string> | undefined }

  return !!serverless?.[pathname]
}

export { workerProtectFilter }
