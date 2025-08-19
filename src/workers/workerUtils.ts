/**
 * Worker - Utils
 */

/* Imports */

import type { Store, StoreServerless } from '@alanizcreative/formation-static/store/storeTypes.js'
import type { ServerlessActionData } from '@alanizcreative/formation-static/serverless/serverlessTypes.js'
import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { IncomingRequestCfProperties } from '@cloudflare/workers-types'
import { ResponseError } from '@alanizcreative/formation-static/utils/ResponseError/ResponseError.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { setConfig, setConfigFilter } from '@alanizcreative/formation-static/config/config.js'
import { setActions } from '@alanizcreative/formation-static/utils/action/action.js'
import { setFilters } from '@alanizcreative/formation-static/utils/filter/filter.js'
import { setRenderFunctions } from '@alanizcreative/formation-static/render/render.js'
import { setStore, setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { storeArgs } from '../store/store.js'
import { config } from '../config/config.js'
import { filters } from '../filters/filters.js'
import { actions } from '../actions/actions.js'
import { renderFunctions } from '../render/render.js'
import { WorkerEnv } from './workerTypes.js'

/**
 * Setup config, filters, actions and store in serverless context.
 *
 * @param {Generic} [env]
 */
const workerServerlessSetup = async (env?: Generic) => {
  setStore(storeArgs)

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: parents } = await import('../../lib/store/parents.json') as unknown as { default: Store['parents'] }
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: archiveMeta } = await import('../../lib/store/archiveMeta.json') as { default: Store['archiveMeta'] }
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: navigations } = await import('../../lib/store/navigations.json') as { default: Store['navigations'] }
  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: navigationItems } = await import('../../lib/store/navigationItems.json') as { default: Store['navigationItems'] }

  setStoreItem('navigations', navigations)
  setStoreItem('navigationItems', navigationItems)
  setStoreItem('parents', parents)
  setStoreItem('archiveMeta', archiveMeta)
  setConfig(config)
  setConfigFilter(env || {})
  setFilters(filters)
  setActions(actions)
  setRenderFunctions(renderFunctions)
}

/**
 * Filter worker responses for password protection.
 *
 * @param {Request} request
 * @return {Promise<boolean>}
 */
const workerServerlessFilter = async (
  request: Request & { cf?: IncomingRequestCfProperties }
): Promise<boolean> => {
  const { url } = request
  const { pathname } = new URL(url)

  /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
  // @ts-ignore - may not exist in build context
  const { default: serverless } = await import('../../lib/store/serverless.json') as { default: StoreServerless<string> | undefined }

  return !!serverless?.[pathname]
}

/**
 * Verify Turnstile token.
 *
 * @param {ServerlessActionData} data
 * @param {Request} request
 * @param {WorkerEnv} env
 * @return {Promise<void>}
 */
const workerServerlessTurnstile = async (
  data: ServerlessActionData,
  request: Request,
  env: WorkerEnv
): Promise<void> => {
  const turnstileToken = data.inputs.turnstile?.value

  if (!isStringStrict(turnstileToken)) {
    throw new ResponseError('Missing token')
  }

  const turnstileResp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      secret: env.CF_TURNSTILE_KEY,
      response: turnstileToken,
      remoteip: request.headers.get('CF-Connecting-IP')
    })
  })

  const turnstileRes = await turnstileResp.json() as { success: boolean }

  if (!turnstileRes.success) {
    throw new ResponseError('Verification failed', turnstileResp)
  }
}

/* Exports */

export {
  workerServerlessSetup,
  workerServerlessFilter,
  workerServerlessTurnstile
}
