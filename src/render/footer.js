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

const footer = (navigations = {}) => {
  /* Nav */

  let nav = ''

  if (navigations?.footer) {
    nav = navigations?.footer ? `<nav aria-label="Secondary">${navigations.footer}</nav>` : ''
  }

  /* Output */

  return `
    <footer>
      <div class="l-container l-padding-top-3xl l-padding-bottom-l l-padding-top-4xl-m l-padding-bottom-xl-m">
        <div class="l-flex l-flex-wrap l-justify-between l-align-end l-gap-margin-l">
          <div>
            <p class="h2 t-weight-normal l-margin-0 l-padding-bottom-l t-background-light">Thanks for dropping by!</p>
            ${nav}
          </div>
          <div>
            <span class="t-xs">&copy; ${getYear()} ${enumSite.title}</span>
          </div>
        </div>
      </div>
    </footer>
  `
}

/* Exports */

module.exports = footer
