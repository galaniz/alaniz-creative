/**
 * Objects - Loader
 */

/* Imports */

import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configVars } from '../../config/config.js'

/**
 * Output loading animation.
 *
 * @return {string}
 */
const Loader = (): string => {
  /* Styles */

  addStyle('objects/Loader/Loader')

  /* Add to template */

  const loaderId = 'tmpl-loader'

  configVars.template.set(loaderId, /* html */`
    <span class="loader absolute inset-0 flex justify-center align-center e-trans" tabindex="-1" aria-label="Loading">
      <span class="loader-circle h-l w-l b-radius-full no-motion-hide"></span>
      <span class="text-s wt-bold none no-motion-show">Loading</span>
    </span>
  `)

  return loaderId
}

/* Exports */

export { Loader }
