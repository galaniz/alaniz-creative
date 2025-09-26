/**
 * Actions
 */

/* Imports */

import type { Actions } from '@alanizcreative/formation-static/utils/action/actionTypes.js'
import { configVars } from '../config/config.js'

/**
 * Actions to hook into.
 *
 * @type {Actions}
 */
const actions: Partial<Actions> = {
  renderStart: () => {
    /* Reset style cache */

    configVars.css.cache.clear()
  }
}

/* Exports */

export { actions }
