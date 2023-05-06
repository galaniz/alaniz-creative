/**
 * Render - navigations
 */

/* Imports */

const Navigation = require('./navigation')

/**
 * Function - output navigations
 *
 * @param {object} args {
 *  @prop {array<object>} navs
 *  @prop {array<object>} items
 *  @prop {string} current
 * } 
 */

const navigations = ({
  navs = [],
  items = [],
  current = ''
}) => {
  /* Navs and items required */

  if (!navs.length && !items.length) {
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

/* Exports */

export default navigations
