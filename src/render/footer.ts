/**
 * Render - footer
 */

/* Imports */

const { enumSite } = require('../vars/enums')
const { getYear } = require('../utils')

/**
 * Function - output footer
 *
 * @param {object} navigations
 * @return {string} HTML - footer
 */

const footer = (navigations: { footer?: string; } = {}): string => {
  /* Nav */

  let nav = ''

  if (navigations?.footer) {
    nav = navigations?.footer ? `<nav aria-label="Secondary">${navigations.footer}</nav>` : ''
  }

  /* Output */

  return `
    <footer class="l-relative l-overflow-hidden l-margin-top-auto t-sharp">
      <div class="l-container">
        <div class="l-flex l-flex-column l-flex-row-m l-justify-between">
          <div class="l-relative-m e-underline-reverse">
            <div class="t-light l-padding-top-4xl l-padding-bottom-l l-padding-top-5xl-m l-padding-bottom-2xl-m">
              <p class="c-footer-title t-h2 t-weight-normal l-margin-0 l-padding-bottom-l">Thanks for dropping&nbsp;by!</p>
              ${nav}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 96 36"
              class="c-footer-blob l-absolute"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path d="m0,35.99s0,0,0,0h93.02c6.46-8.98,1.76-20.61-7.91-24.28-10.21-3.87-14.2-.14-25.5-1.96-13.19-2.13-14.92-7.51-24.94-9.42C23.46-1.79,13.75,6.58,0,11.06v24.93Z" fill="currentcolor" />
            </svg>
          </div>
          <div class="c-footer-copyright l-flex l-padding-bottom-l l-padding-bottom-2xl-m">
            <span class="l-margin-top-auto t-xs">&copy; ${getYear()} ${enumSite.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

export default footer
