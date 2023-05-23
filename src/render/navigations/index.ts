/**
 * Render - navigations
 */

/* Imports */

import Navigation from '../navigation'

/**
 * Function - output navigations
 *
 * @param {object} args
 * @param {array<object>} args.navs
 * @param {array<object>} args.items
 * @param {string} args.current
 * @return {object}
 */

interface Args {
  navs: Render.Nav[]
  items: Render.NavItem[]
  current: string
  title?: string
  parents?: object[]
}

const navigations = ({
  navs = [],
  items = [],
  current = ''
}: Args): object => {
  /* Navs and items required */

  if ((navs.length === 0) && (items.length === 0)) {
    return {
      main: '',
      footer: ''
    }
  }

  /* Navigation instance */

  const nav = new Navigation({ navs, items })

  /* Output */

  return {
    main: nav.getOutput(
      'main',
      current,
      {
        listClass: 'c-nav__list l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden outline-tight',
        listAttr: 'role="list"',
        itemClass: 'c-nav__item e-transition',
        itemAttr: 'data-overflow-group="0"',
        linkClass: 'c-nav__link t t-weight-medium t-line-height-130-pc l-inline-flex l-padding-top-3xs l-padding-bottom-3xs l-padding-left-3xs l-padding-right-3xs l-relative l-after',
        internalLinkClass: 'js-pt-link'
      }
    ),
    footer: nav.getOutput(
      'footer',
      current,
      {
        listClass: 'l-flex l-flex-wrap l-gap-margin-m l-gap-margin-l-m t-list-style-none e-underline-reverse',
        listAttr: 'role="list"',
        linkClass: 't-s',
        internalLinkClass: 'js-pt-link',
        linkAttr: 'data-inline'
      }
    )
  }
}

/**
 * Function - output nav element with contents
 *
 * @param {object} args
 * @param {object} args.navs
 * @param {object} args.props
 * @return {string}
 */

interface NavArgs {
  navs: object
  props: {
    location?: string
    title?: string
  }
}

export const navContainer = ({ navs = {}, props = {} }: NavArgs): string => {
  const { location = '', title = '' } = props

  if (location !== '' && title !== '') {
    const loc = location.toLowerCase().replace(/ /g, '')
    const nav: string = navs?.[loc] !== '' ? navs[loc] : ''

    return `<nav aria-label="${title}">${nav}</nav>`
  }

  return ''
}

/* Exports */

export default navigations
