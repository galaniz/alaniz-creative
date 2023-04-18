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
      singular: 'Work',
      archiveId: ''
    }
  }
}

/**
 * Nav data for json storage
 *
 * @type {object}
 */

const navData = {}

/**
 * Script data for front end
 *
 * @type {object}
 */

const scriptData = {}

/**
 * Archive data
 *
 * @type {object}
 */

const archiveData = {
  ids: {}, // Page archive ids by content type
}

/**
 * Data to store in json files
 *
 * @type {object}
 */

const jsonFileData = {
  slugs: {
    data: '',
    name: 'slugs.json'
  },
  slugParents: {
    data: '',
    name: 'slug-parents.json'
  },
  archiveIds: {
    data: '',
    name: 'archive-ids.json'
  },
  navData: {
    data: '',
    name: 'nav-data.json'
  }
}

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
    prod: 'https://alaniz-creative.pages.dev/'
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
  navData,
  scriptData,
  archiveData,
  jsonFileData,
  envData
}
