/**
 * Vars - data
 */

/**
 * Slug data for link and json file generation
 *
 * @type {object}
 * @prop {object} parents
 * @prop {object} bases
 * @prop {object} bases.page
 * @prop {string} bases.page.slug
 * @prop {string} bases.page.title
 * @prop {string} bases.page.singular
 * @prop {object} bases.work
 * @prop {string} bases.work.slug
 * @prop {string} bases.work.title
 * @prop {string} bases.work.singular
 * @prop {string} bases.work.archiveId
 */

interface SlugBase {
  slug: string
  title: string
  singular: string
  archiveId?: string
}

interface Slug {
  parents: object
  bases: {
    page: SlugBase
    work: SlugBase
  }
}

const slugData: Slug = {
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
 * @prop {array<object>} navs
 * @prop {array<object>} items
 */

interface Nav {
  navs: Render.Nav[]
  items: Render.NavItem[]
}

const navData: Nav = {
  navs: [],
  items: []
}

/**
 * Script data for front end
 *
 * @type {object}
 */

interface Script {
  id?: string
  sendUrl?: string
}

const scriptData: Script = {}

/**
 * Archive data
 *
 * @type {object}
 * @prop {object} ids
 * @prop {object} posts
 */

interface Archive {
  ids: object
  posts: object
}

const archiveData: Archive = {
  ids: {}, // Page archive ids by content type
  posts: {} // Posts by content type
}

/**
 * Data to store in json files
 *
 * @type {object} {
 * @prop {object} slugs
 * @prop {string} slugs.data
 * @prop {string} slugs.name
 * @prop {object} slugParents
 * @prop {string} slugParents.data
 * @prop {string} slugParents.name
 * @prop {object} archiveIds
 * @prop {string} archiveIds.data
 * @prop {string} archiveIds.name
 * @prop {object} archivePosts
 * @prop {string} archivePosts.data
 * @prop {string} archivePosts.name
 * @prop {object} navData
 * @prop {string} navData.data
 * @prop {string} navData.name
 */

interface File {
  data: string
  name: string
}

interface JsonFile {
  slugs: File
  slugParents: File
  archiveIds: File
  archivePosts: File
  navData: File
}

const jsonFileData: JsonFile = {
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
  archivePosts: {
    data: '',
    name: 'archive-posts.json'
  },
  navData: {
    data: '',
    name: 'nav-data.json'
  }
}

/**
 * Env/context data
 *
 * @type {object} {
 * @prop {boolean} dev
 * @prop {boolean} prod
 * @prop {object} urls
 * @prop {string} urls.dev
 * @prop {string} urls.prod
 * @prop {object} eleventy
 * @prop {boolean} eleventy.cache
 * @prop {object} smtp2go
 * @prop {string} smtp2go.apiKey
 */

interface Env {
  dev: boolean
  prod: boolean
  urls: {
    dev: string
    prod: string
  }
  eleventy: {
    cache: boolean
  }
  smtp2go: {
    apiKey: string
  }
}

const envData: Env = {
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

export {
  slugData,
  navData,
  scriptData,
  archiveData,
  jsonFileData,
  envData
}
