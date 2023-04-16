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
        listClass: 'c-nav__list l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden',
        listAttr: 'role="list"',
        itemClass: 'c-nav__item',
        itemAttr: 'data-overflow-group="0"',
        linkClass: 'c-nav__link t t-weight-medium t-line-height-130-pc l-inline-flex',
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

module.exports = navigations
