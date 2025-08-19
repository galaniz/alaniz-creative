/**
 * Objects - Loader
 */

/* Imports */

import type { LoaderArgs } from './LoaderTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { configVars } from '../../config/config.js'

/**
 * Output loading animation.
 *
 * @param {LoaderArgs} [args]
 * @return {string}
 */
const Loader = (args?: LoaderArgs): string => {
  /* Args */

  const {
    classes,
    size,
    focusable = true
  } = isObjectStrict(args) ? args : {}

  /* Size */

  const hasSize = isStringStrict(size)

  /* Classes */

  let containerClasses =
    `loader${hasSize ? ` loader-${size}` : ''} absolute all-0 flex justify-center align-center e-trans`

  if (isStringStrict(classes)) {
    containerClasses += ` ${classes}`
  }

  /* Styles */

  addStyle('objects/Loader/Loader')

  /* Add to template */

  let loaderId = 'tmpl-loader'

  if (hasSize) {
    loaderId += `-${size}`
  }

  configVars.template.set(loaderId, /* html */`
    <span class="${containerClasses}"${focusable ? ' tabindex="-1" aria-label="Loading"' : ''}>
      <span class="loader-circle h-l w-l b-radius-full no-motion-hide"></span>
      <span class="text-s wt-bold none no-motion-show">Loading</span>
    </span>
  `)

  return loaderId
}

/* Exports */

export { Loader }
