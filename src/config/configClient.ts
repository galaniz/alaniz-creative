/**
 * Config - Client
 */

/* Imports */

import { config, setConfig } from '@alanizcreative/formation/config/config.js'
import { configFlexGap } from '@alanizcreative/formation/config/configFlexGap.js'

/**
 * Initialize supports and props.
 *
 * @return {void}
 */
const setConfigClient = (): void => {
  setConfig()
  configFlexGap()

  if (!config.flexGap) {
    const head = document.querySelector('head')

    if (head) {
      head.insertAdjacentHTML(
        'afterbegin',
        '<link rel="stylesheet" href="/assets/css/global/globalGapFallback.css" media="all">'
      )
    }
  }
}

/* Exports */

export {
  config as configClient,
  setConfigClient
}
