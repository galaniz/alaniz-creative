/**
 * Objects - Logo
 */

/* Imports */

import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { config } from '../../config/config.js'
import { LogoSvg } from '../../svg/Logo/Logo.js'

/**
 * Output logo link.
 *
 * @param {string} [classes]
 * @return {string} HTMLAnchorElement
 */
const Logo = (classes?: string): string => {
  return /* html */`
    <a class="inline-flex relative${isStringStrict(classes) ? ` ${classes}` : ''}" href="${getPermalink()}">
      <span class="a-hide-vis">${config.title} Home</span>
      ${LogoSvg('logo')}
    </a>
  `
}

/* Exports */

export { Logo }
