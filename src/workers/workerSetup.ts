/**
 * Worker - Protect
 */

import { setConfig, setConfigFilter } from '@alanizcreative/formation-static/config/config.js'
import { setActions } from '@alanizcreative/formation-static/actions/actions.js'
import { setFilters } from '@alanizcreative/formation-static/filters/filters.js'
import { setRenderFunctions } from '@alanizcreative/formation-static/render/render.js'
import { setStore } from '@alanizcreative/formation-static/store/store.js'
import { storeArgs } from '../store/store.js'
import { config } from '../config/config.js'
import { filters } from '../filters/filters.js'
import { actions } from '../actions/actions.js'
import { renderFunctions } from '../render/render.js'

/**
 * Set up config, filters, actions and store for the password page.
 *
 * @param {object} env
 */
const workerProtectSetup = (env: object) => {
  setStore(storeArgs)
  setConfig(config)
  setConfigFilter(env)
  setFilters(filters)
  setActions(actions)
  setRenderFunctions(renderFunctions)
}

export { workerProtectSetup }
