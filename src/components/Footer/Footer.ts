/**
 * Components - Footer
 */

/* Imports */

import { getYear } from '@alanizcreative/formation-static/utils/year/year.js'
import { addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { navigationsInstance } from '../Navigation/Navigations.js'
import { config } from '../../config/config.js'

/**
 * Output footer.
 *
 * @prop {string} currentLink
 * @prop {string|string[]} [currentType]
 * @return {string} HTMLElement
 */
const Footer = (currentLink: string, currentType?: string | string[]): string => {
  /* Navigation */
  
  const listOutput = navigationsInstance?.getOutput('footer', {
    currentLink,
    currentType,
    listClass: 'flex flex-wrap gap-m gap-l-m ls-none e-line-in',
    listAttr: 'role="list"',
    linkClass: 'text-s',
    linkAttr: 'data-rich'
  }, 1) ?? ''

  const navOutput = listOutput ? `<nav class="bg-foreground-base" aria-label="Primary">${listOutput}</nav>` : ''

  /* Styles */

  addStyle('components/Footer/Footer')

  /* Output */

  return /* html */`
    <footer class="footer relative overflow-hidden mt-auto sharp">
      <div class="container">
        <div class="flex col row-m justify-between">
          <div class="footer-relative">
            <div class="pt-4xl pb-l pt-5xl-m pb-2xl-m">
              <p class="bg-foreground-base heading-l wt-normal m-0 pb-l pr-2xl">Thanks for dropping&nbsp;by!</p>
              ${navOutput}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 36"
              class="footer-blob absolute"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path d="m0,35.99s0,0,0,0h93.02c6.46-8.98,1.76-20.61-7.91-24.28-10.21-3.87-14.2-.14-25.5-1.96-13.19-2.13-14.92-7.51-24.94-9.42C23.46-1.79,13.75,6.58,0,11.06v24.93Z" fill="currentcolor" />
            </svg>
          </div>
          <div class="footer-legal flex pb-l pb-2xl-m">
            <span class="mt-auto text-xs">&copy; ${getYear()} ${config.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

export { Footer }
