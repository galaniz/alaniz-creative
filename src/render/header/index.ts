/**
 * Render - header
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { getPermalink } from '../../utils'
import { enumSite } from '../../vars/enums'
import logoSvg from '../svg/logo'

/**
 * Function - output header
 *
 * @param {object} navigations
 * @return {string} HTML - header
 */

const header = (navigations: { main?: string } = {}): string => {
  /* Id */

  const id: string = uuid()

  /* Main nav */

  let nav = ''

  if (navigations?.main !== '' && navigations?.main !== undefined) {
    nav = `
      <nav class="c-nav l-relative l-container l-padding-top-m l-padding-bottom-m l-padding-top-l-m l-padding-bottom-l-m" aria-label="Main" data-overflow="false" data-overflow-all="false" data-open="false">
        <div class="l-flex l-justify-between l-align-center">
          <a class="c-nav__logo l-inline-flex l-z-index-1 js-pt-link" href="${getPermalink()}">
            <span class="a11y-visually-hidden">${enumSite.title} Home</span>
            ${logoSvg('o-logo')}
          </a>
          ${navigations.main}
          <div class="c-nav__hide">
            <button class="c-nav__button c-nav__open l-relative l-padding-top-5xs l-z-index-1 t-sharp" type="button" aria-haspopup="dialog" aria-controls="${id}" aria-label="Open menu">
              <span class="c-nav-icon l-block l-relative t-sharp e-transition" data-num="5">
                <span class="c-nav-icon__top bg-current l-block e-transition"></span>
                <span class="c-nav-icon__middle bg-current l-block e-transition"></span>
                <span class="c-nav-icon__bottom bg-current l-block e-transition"></span>
              </span>
              <span class="c-nav-icon__label t-xs t-weight-medium l-block" aria-hidden="true">Menu</span>
            </button>
          </div>
          <div class="c-nav-overflow l-fixed l-top-0 l-left-0 l-z-index-1 l-width-100-pc l-height-100-pc" role="dialog" aria-modal="true" aria-label="Main menu" id="${id}">
            <div class="c-nav__hide">
              <a class="c-nav__logo o-logo l-inline-flex l-fixed js-pt-link" href="${getPermalink()}" aria-label="${enumSite.title} Home"></a>
            </div>
            <div class="c-nav-overflow__main t-sharp t-link-current l-height-100-pc l-overflow-y-auto l-overscroll-none l-overflow-x-hidden l-padding-left-3xs l-padding-right-3xs l-padding-top-m l-padding-bottom-m">
              <ul class="c-nav-overflow__list l-flex l-flex-column l-padding-bottom-l l-gap-margin-2xs t-list-style-none outline-tight" role="list"></ul>
            </div>
            <div class="c-nav__hide">
              <button class="c-nav__button c-nav__close c-nav-icon l-height-l l-fixed" type="button" aria-label="Close menu" data-visible="false"></button>
            </div>
          </div>
          <div class="c-nav__overlay l-fixed l-bottom-0 l-left-0 l-width-100-pc l-height-100-pc bg-background-light e-transition-quad"></div>
        </div>
      </nav>
    `
  }

  /* Output */

  return `
    <header>
      <a href="#main" class="c-skip-link o-button b-radius-l o-button-secondary b-all l-absolute bg-background-light">
        Skip to main content
      </a>
      ${nav}
    </header>
  `
}

/* Exports */

export default header
