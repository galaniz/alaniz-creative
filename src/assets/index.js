/**
 * Site js
 */

/* Imports */

import { setElements, usingMouse } from '@alanizcreative/formation/src/utils'
import Nav from '@alanizcreative/formation/src/components/nav'

/**
 * Namespace
 *
 * @type {string}
 */

const ns = window.namespace

/**
 * Namespace object - back end info
 *
 * @type {object}
 */

const n = window[ns]

/**
 * Store DOM elements from setElements
 *
 * @type {object}
 */

const el = {}

/**
 * Props and selectors for setElements
 *
 * @type {array<object>}
 */

const meta = [
  {
    prop: 'nav',
    selector: '.c-nav',
    items: [
      {
        prop: 'navLogo',
        selector: '.c-nav__logo',
        all: true
      },
      {
        prop: 'navList',
        selector: '.c-nav__list'
      },
      {
        prop: 'navOverflow',
        selector: '.c-nav-overflow'
      },
      {
        prop: 'navOverflowList',
        selector: '.c-nav-overflow__list'
      },
      {
        prop: 'navItems',
        selector: '.c-nav__item[data-depth="0"]',
        all: true
      },
      {
        prop: 'navLinks',
        selector: '.c-nav__link',
        all: true
      },
      {
        prop: 'navOpen',
        selector: '.c-nav__open'
      },
      {
        prop: 'navClose',
        selector: '.c-nav__close'
      },
      {
        prop: 'navOverlay',
        selector: '.c-nav__overlay'
      }
    ]
  }
]

/**
 * Function - initialize functions and classes
 *
 * @return {void}
 */

const initialize = () => {
  /* JavaScript enabled add js body class */

  const body = document.body

  body.classList.remove('no-js')
  body.classList.add('js')

  /* Set elements object */

  setElements(document, meta, el)

  /* Check if using mouse */

  usingMouse()

  /* Navigation */

  if (el.nav && el.navLogo) {
    const nav = () => {
      const itemSelector = '.c-nav__item[data-depth="0"]'

      return new Nav({
        nav: el.nav,
        list: el.navList,
        overflow: el.navOverflow,
        overflowList: el.navOverflowList,
        items: el.navItems,
        itemSelector,
        links: el.navLinks,
        open: el.navOpen,
        close: el.navClose,
        overlay: el.navOverlay,
        delay: {
          open: 300,
          close: 300
        },
        filterFocusableItem (item) {
          return el.navLogo[0] !== item
        },
        done () {
          this._firstFocusableItem = el.navLogo[1]
        }
      })
    }

    nav()
  }
}

initialize()
