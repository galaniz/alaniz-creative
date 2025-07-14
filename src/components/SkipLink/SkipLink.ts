/**
 * Components - Skip Link
 */

/* Imports */

import { addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'

/**
 * Output link to main landmark.
 *
 * @return {string} HTMLAnchorElement
 */
const SkipLink = (): string => {
  /* Styles */

  addStyle('components/SkipLink/SkipLink')

  /* Output */

  return /* html */`
    <a
      href="#main"
      class="skip-link button b-radius-l button-secondary b-all absolute bg-background-light"
    >
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLink }
