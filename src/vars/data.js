/**
 * Vars - data
 */

/**
 * Slug data for link and json file generation
 *
 * @type {object}
 */

const slugData = {
  parents: {}, // Parent items for slug generation
  bases: { // Content type bases for slug generation
    page: {
      slug: '',
      title: '',
      singular: ''
    },
    work: {
      slug: 'work',
      title: 'Work',
      singular: 'Work'
    }
  }
}

/**
 * Script data for front end
 *
 * @type {object}
 */

const scriptData = {}

/**
 * Env/context data
 *
 * @type {object}
 */

const envData = {
  dev: true,
  prod: false,
  urls: {
    dev: '/',
    prod: 'https://alanizcreative.com/'
  },
  eleventy: {
    cache: false
  },
  smtp2go: {
    apiKey: ''
  }
}

/* Export */

module.exports = {
  slugData,
  scriptData,
  envData
}
