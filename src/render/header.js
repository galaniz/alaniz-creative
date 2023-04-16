/**
 * Render - header
 */

/* Imports */

const { v4: uuidv4 } = require('uuid')
const { getPermalink } = require('../utils')
const { enumSite } = require('../vars/enums')
const logoSvg = require('./svg/logo')

/**
 * Function - output header
 *
 * @param {object} navigations
 * @return {string} HTML - header
 */

const header = (navigations = {}) => {
  /* Id */

  const id = `n-${uuidv4()}`

  /* Main nav */

  let nav = ''

  if (navigations?.main) {
    nav = `
      <nav class="c-nav l-relative l-container l-padding-top-m l-padding-bottom-m l-padding-top-l-m l-padding-bottom-l-m" aria-label="Main" data-overflow="false" data-overflow-all="false" data-open="false">
        <div class="c-nav__overlay l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc bg-background-light e-transition"></div>
        <div class="l-flex l-justify-between l-align-center">
          <a class="c-nav__logo l-block js-pt-link" href="${getPermalink()}">
            <span class="a11y-visually-hidden">${enumSite.title} home</span>
            ${logoSvg('o-logo')}
          </a>
          ${navigations.main}
          <div class="c-nav__hide">
            <button class="c-nav__button c-nav__open l-relative l-padding-top-5xs" type="button" aria-haspopup="dialog" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative e-transition" data-num="5">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon-label t-xs t-weight-medium l-block e-transition" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav-overflow l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc bg-background-light t-dark t-link-current e-transition" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav-overflow__main e-transition l-height-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden">
              <ul class="c-nav-overflow__list l-flex l-flex-column l-gap-margin-2xs t-list-style-none" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close" type="button" aria-label="Close menu" data-visible="false"></button>
            </div>
          </div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      <a href="#main" class="c-skip-link o-button o-button-secondary l-absolute l-left-0 l-top-0">
        Skip to main content
      </a>
      ${nav}
    </header>
  `
}

/* Exports */

module.exports = header
