/**
 * Vars - enums
 */

/**
 * Namespace
 *
 * @type {string}
 */

const enumNamespace = 'ac'

/**
 * Site info
 *
 * @type {object}
 */

const enumSite = {
  title: 'Alaniz Creative',
  email: 'graciela@alanizcreative.com',
  meta: {
    description: '',
    image: ''
  }
}

/**
 * Colors
 *
 * @type {object}
 */

const enumColors = {
  base: '#222222',
  foreground: {
    base: '#222222',
  },
  background: {
    light: '#ffffff'
  },
  negative: {
    light: '#e491a0',
    dark: '#9c263c'
  },
  positive: {
    light: '#6ac28d',
    dark: '#1d5634'
  }
}

/**
 * Posts layouts
 *
 * @type {object}
 */

const enumLayouts = {
  cardsMinimal: {
    type: 'cards',
    subtype: 'minimal'
  },
  cardsAlternating: {
    type: 'cards',
    subtype: 'alternating'
  },
  cardsCascading: {
    type: 'cards',
    subtype: 'cascading'
  }
}

/* Export */

module.exports = {
  enumNamespace,
  enumSite,
  enumColors,
  enumLayouts
}
