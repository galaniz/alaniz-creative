/**
 * Vars - enums
 */

/**
 * Namespace
 *
 * @type {string}
 */

const enumNamespace: string = 'ac'

/**
 * Site info
 *
 * @type {object}
 * @prop {string} title
 * @prop {string} email
 * @prop {object} meta
 * @prop {string} meta.description
 * @prop {string} meta.image
 */

interface Site {
  title: string;
  email: string;
  meta: {
    description: string;
    image: string;
  }
}

const enumSite: Site = {
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
 * @prop {string} base
 * @prop {object} foreground
 * @prop {string} foreground.base
 * @prop {object} background
 * @prop {string} background.light
 */

interface Colors {
  base: string;
  foreground: {
    base: string;
  }
  background: {
    light: string;
  }
}

const enumColors: Colors = {
  base: '#222222',
  foreground: {
    base: '#222222'
  },
  background: {
    light: '#ffffff'
  }
}

/**
 * Posts layouts
 *
 * @type {object}
 * @prop {object} cardsMinimal
 * @prop {string} cardsMinimal.type
 * @prop {string} cardsMinimal.subtype
 * @prop {object} cardsAlternating
 * @prop {string} cardsAlternating.type
 * @prop {string} cardsAlternating.subtype
 * @prop {object} cardsCascading
 * @prop {string} cardsCascading.type
 * @prop {string} cardsCascading.subtype
 */

interface Card {
  type: string;
  subtype: string;
}

interface Layouts {
  cardsMinimal: Card;
  cardsAlternating: Card;
  cardsCascading: Card;
}

const enumLayouts: Layouts = {
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

export {
  enumNamespace,
  enumSite,
  enumColors,
  enumLayouts
}
