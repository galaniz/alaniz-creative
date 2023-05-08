/**
 * Render - navigations
 */

/* Imports */

import Navigation from './navigation'

/**
 * Function - output navigations
 *
 * @param {object} args {
 * @param {array<object>} args.navs
 * @param {array<object>} args.items
 * @param {string} args.current
 * @return {object}
 */

interface Item {
  id?: string;
  title: string;
  link?: string;
  internalLink?: Render.InternalLink;
  externalLink?: string;
  children?: Item[];
  props?: Item;
  current?: boolean;
  external?: boolean;
  descendentCurrent?: boolean;
}

interface Nav {
  title: string;
  location: string;
  items: Item[];
}

interface Args {
  navs: Nav[];
  items: Item[];
  current: string;
  title?: string;
  parents?: object[];
}

const navigations = ({
  navs = [],
  items = [],
  current = ''
}: Args) => {
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
