/**
 * Components - Navigation Primary
 */

/* Imports */

import type { NavigationPrimaryArgs } from './NavigationTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { navigationsInstance } from './Navigations.js'
import { config, configVars } from '../../config/config.js'
import { Logo } from '../../objects/Logo/Logo.js'

/**
 * Output primary navigation.
 *
 * @param {NavigationPrimaryArgs} args
 * @return {string} HTMLElement
 */
const NavigationPrimary = (args: NavigationPrimaryArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    currentLink,
    currentType
  } = args

  /* List */
  
  const listClass = 'nav-list ls-none'
  const listAttr = 'role="list"'
  const linkClass = 'nav-link'
  const itemClass = 'nav-item e-trans'
  const listOutput = navigationsInstance?.getOutput('header', {
    currentLink,
    currentType,
    listClass,
    listAttr,
    linkClass,
    itemClass,
    depthAttr: true,
    filterBeforeList ({ args, depth }) {
      let listAttrs = listAttr
      let listClasses = listClass

      if (depth === 0) {
        listAttrs += ' data-nav-slot'
        listClasses += ' flex align-center gap-m overflow-x-auto overflow-y-hidden outline-tight'
      }

      args.listAttr = listAttrs
      args.listClass = listClasses
    },
    filterBeforeItem ({ args, depth }) {
      let itemAttrs = ''

      if (depth === 0) {
        itemAttrs = 'data-nav-item'
      }

      args.itemAttr = itemAttrs
    },
    filterBeforeLink: ({ depth, args }) => {
      let linkClasses = linkClass

      if (depth === 0) {
        linkClasses += ' text-m wt-medium lead-base inline-flex py-3xs px-3xs relative after'
      }

      args.linkClass = linkClasses
    }
  }, 1) ?? ''

  /* Modal */

  let modalOutput = ''

  if (listOutput) {
    modalOutput = /* html */`
      <button
        class="nav-open pt-5xs flex nav-hide no-js-none"
        aria-haspopup="true"
        aria-label="Open menu"
        data-nav-open
      >
        <span class="nav-icon block relative sharp e-trans" data-nav-icon="5">
          <span class="nav-icon-top bg-current block e-trans"></span>
          <span class="nav-icon-middle bg-current block e-trans"></span>
          <span class="nav-icon-bottom bg-current block e-trans"></span>
        </span>
        <span class="text-xs wt-medium block mt-4xs" aria-hidden="true">Menu</span>
      </button>
      <div
        class="nav-modal fixed all-0 w-full h-full z-index-1"
        role="dialog"
        aria-modal="true"
        aria-label="Primary menu"
        data-nav-modal
      >
        <a
          class="nav-modal-logo logo inline-flex fixed"
          href="${getPermalink()}"
          aria-label="${config.title} Home"
        ></a>
        <div class="nav-modal-scroll overflow-y-auto overflow-x-hidden overscroll-none h-full e-trans relative sharp px-3xs py-m">
          <ul class="nav-modal-list flex col pb-l gap-2xs outline-tight ls-none h-full" role="list" data-nav-modal-slot></ul>
          <button
            class="nav-close nav-icon h-l fixed"
            aria-label="Close menu"
            data-nav-close
          ></button>
        </div>
        <div
          class="nav-overlay fixed all-0 z-index--1 w-full h-full bg-background-light e-trans e-quad"
          data-nav-close
        ></div>
      </div>
    `
  }

  /* Scripts and styles */

  addStyle('components/Navigation/NavigationPrimary')
  addScript('components/Navigation/NavigationPrimaryClient')

  /* Breakpoint */

  const breakpoint = 600
  const breakpointRem = (breakpoint + 1) / 16

  /* Inline styles */

  configVars.style.add(`@media screen and (min-width:${breakpointRem}rem){.nav{--nav-slot-opacity:1;--nav-hide:none}}`)
  configVars.noscript.add('<style>.nav{--nav-slot-opacity:1}</style>')

  /* Output */

  return /* html */`
    <ac-navigation-primary
      class="nav relative container py-m py-l-m flex justify-between align-center td-none"
      breakpoints="${breakpoint}"
      role="navigation"
      aria-label="Primary"
    >
      ${Logo('nav-logo mr-2xl')}
      ${listOutput}
      ${modalOutput}
    </ac-navigation-primary>
  `
}

/* Exports */

export { NavigationPrimary }
