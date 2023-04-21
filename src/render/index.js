/**
 * Render
 */

/* Imports */

const { enumNamespace } = require('../vars/enums')
const { getAllLocalData, getSlug, getPermalink } = require('../utils')
const { slugData, envData, navData, archiveData, scriptData, jsonFileData } = require('../vars/data')
const slugParentsJson = require('../json/slug-parents.json')
const archiveIdsJson = require('../json/archive-ids.json')
const navDataJson = require('../json/nav-data.json')
const layout = require('./layout')
const header = require('./header')
const footer = require('./footer')
const button = require('./button')
const container = require('./container')
const column = require('./column')
const richText = require('./rich-text')
const image = require('./image')
const navigations = require('./navigations')
const hero = require('./hero')
const httpError = require('./http-error')

/**
 * Store slug data for json
 *
 * @type {object}
 */

const _slugs = {}

/**
 * Function - recurse and output nested content
 *
 * @private
 * @param {object} args {
 *  @prop {array<object>} contentData
 *  @prop {object} output
 *  @prop {array<object>} parents
 *  @prop {object} pageData
 *  @prop {object} serverlessData
 *  @prop {function} getLocalData
 *  @prop {object} navs
 * }
 * @return {void}
 */

const _renderContent = async ({
  contentData = [],
  output = {},
  parents = [],
  pageData = {},
  serverlessData,
  getLocalData,
  navs
}) => {
  if (Array.isArray(contentData) && contentData.length) {
    for (let i = 0; i < contentData.length; i++) {
      let c = contentData[i]

      /* Check for nested content */

      let children = c?.content || []
      let recurse = false

      if (children) {
        if (Array.isArray(children)) {
          if (children.length) {
            recurse = true
          }
        }
      }

      /* Render and recursion */

      const props = c || {}
      const renderType = c?.renderType || ''

      let renderObj = {
        start: '',
        end: ''
      }

      switch (renderType) {
        case 'column':
          renderObj = column({ args: props, parents })
          break
        case 'container':
          renderObj = container({ args: props, parents })
          break
        case 'rich-text':
          renderObj.start = richText({ args: props, parents })
          break
        case 'image':
          renderObj.start = image({ args: props, parents })
          break
        case 'button':
          renderObj.start = button({ args: props, parents })
          break
        case 'navigation': {
          const loc = props.location.toLowerCase().replace(/ /g, '')
          const nav = navs?.[loc] ? navs[loc] : ''

          renderObj.start = `<nav aria-label="${props.title}">${nav}</nav>`
          break
        }
      }

      const start = renderObj.start
      const end = renderObj.end

      output.html += start

      if (children && recurse) {
        const parentsCopy = [...parents]

        parentsCopy.unshift({
          renderType,
          props
        })

        await _renderContent({
          contentData: children,
          output,
          parents: parentsCopy,
          pageData,
          serverlessData,
          getLocalData,
          navs
        })
      }

      output.html += end

      /* Clear parents */

      if (renderType && renderType !== 'content' && end) {
        parents = []
      }
    }
  }
}

/**
 * Function - output single post or page
 *
 * @private
 * @param {object} args {
 *  @prop {object} item
 *  @prop {string} contentType
 *  @prop {object} serverlessData
 *  @prop {function} getLocalData
 *  @prop {array} navs
 *  @prop {array} navItems
 * }
 * @return {object}
 */

const _renderItem = async ({
  item = {},
  contentType = 'page',
  serverlessData,
  getLocalData,
  navs,
  navItems
}) => {
  /* Serverless render check */

  let serverlessRender = false

  /* Item id */

  const id = item.id

  /* Item props */

  const props = Object.assign({
    title: '',
    slug: '',
    pagination: false,
    heroTitle: '',
    heroImage: false,
    content: [],
    metaTitle: '',
    metaDescription: '',
    metaImage: false
  }, item)

  /* Meta */

  const title = props.title

  const meta = {
    title: props.metaTitle || title,
    description: props.metaDescription,
    image: props.metaImage
  }

  /* Permalink */

  const slugArgs = {
    id,
    contentType,
    slug: props.slug,
    returnParents: true
  }

  const s = getSlug(slugArgs)
  const slug = s.slug
  const permalink = getPermalink(s.slug)

  meta.canonical = permalink

  item.basePermalink = getPermalink(
    getSlug({
      id,
      contentType,
      slug: props.slug
    })
  )

  /* Add to data by slugs store */

  _slugs[slug ? `/${slug}/` : '/'] = {
    contentType,
    id
  }
  
  /* Check if index */

  const index = props.slug === 'index'

  meta.isIndex = index

  /* Navigations */

  const navsOutput = navigations({
    navs: navData.navs,
    items: navData.items,
    current: permalink,
    title,
    parents: s.parents
  })

  /* Hero */

  const heroOutput = hero({
    contentType,
    type: props.heroType,
    title: props.heroTitle || props.title,
    image: props.heroImage ? props.heroImage : false
  })

  /* Main output */

  let output = ''

  /* Content loop */

  const contentOutput = { html: '' }

  let contentData = props.content
  let itemServerlessData = false

  if (serverlessData) {
    if (serverlessData?.path && serverlessData?.query) {
      if (serverlessData.path === (slug ? `/${slug}/` : '/')) {
        itemServerlessData = serverlessData
      } else { // Avoid re-rendering non dynamic pages
        return {
          serverlessRender: false,
          data: false
        }
      }
    }
  }

  if (Array.isArray(contentData) && contentData.length) {
    await _renderContent({
      contentData,
      serverlessData: itemServerlessData,
      getLocalData,
      output: contentOutput,
      parents: [],
      pageData: item,
      navs: navsOutput
    })
  }

  output += contentOutput.html

  /* Prev next pagination - end for pagination update from posts */

  if (item?.pagination) {
    serverlessRender = true

    const pagination = item.pagination

    slugArgs.page = pagination.current > 1 ? pagination.current : 0

    const c = getSlug(slugArgs)

    meta.canonical = getPermalink(c.slug, pagination.current === 1) + pagination.currentFilters

    if (pagination?.prev) {
      slugArgs.page = pagination.prev > 1 ? pagination.prev : 0

      const p = getSlug(slugArgs)

      meta.prev = getPermalink(p.slug, pagination.prev === 1) + pagination.prevFilters
    }

    if (pagination?.next) {
      if (pagination.next > 1) {
        slugArgs.page = pagination.next

        const n = getSlug(slugArgs)

        meta.next = getPermalink(n.slug, false) + pagination.nextFilters
      }
    }

    meta.title = item.metaTitle
  }

  /* Script data */

  let script = ''

  if (Object.keys(scriptData).length) {
    const scriptJSON = JSON.stringify(scriptData, null, null)

    script = `
      <script>
        var namespace = '${enumNamespace}';
        var ${enumNamespace} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  Object.keys(scriptData).forEach(k => delete scriptData[k])

  /* Output */

  const layoutOutput = await layout({
    meta,
    content: `
      ${header(navsOutput)}
      <main id="main">
        ${heroOutput}
        ${output}
      </main>
      ${footer(navsOutput)}
    `,
    script
  })

  return {
    serverlessRender,
    data: {
      slug: slug ? `/${slug}/` : '/',
      output: layoutOutput
    }
  }
}

/**
 * Function - loop through all content types to output pages and posts
 *
 * @param {object} args {
 *  @prop {object} serverlessData
 *  @prop {object} env
 *  @prop {function} getLocalData
 *  @prop {function} onRenderEnd
 * }
 * @return {array|object}
 */

const render = async ({
  serverlessData,
  env,
  getLocalData,
  onRenderEnd
}) => {
  /* Serverless data */

  serverlessData = serverlessData?.query && serverlessData?.path ? serverlessData : false

  if (env) {
    envData.dev = env.dev
    envData.prod = env.prod
  }

  /* Local data */

  const allLocalData = await getAllLocalData(serverlessData, getLocalData)

  if (!allLocalData) {
    return [{
      slug: '',
      output: ''
    }]
  }

  const {
    content = {},
    navs = [],
    navItems = [],
    redirects = []
  } = allLocalData

  /* Store navigations and items */

  navData.navs = navs
  navData.items = navItems

  /* Store content data */

  const data = []

  /* Store routes for render end */

  const serverlessRoutes = []

  /* Loop through pages first to set parent slugs */

  if (!serverlessData) {
    content.page.forEach(item => {
      let { parent, id, archive } = item

      if (archive) {
        archiveData.ids[archive] = id

        if (slugData.bases?.[archive]) {
          slugData.bases[archive].archiveId = id
        }
      }

      if (parent && id) {
        if (parent.slug && parent.title) {
          slugData.parents[id] = {
            id: parent.id,
            slug: parent.slug,
            title: parent.title,
            contentType: 'page'
          }
        }
      }
    })
  } else {
    if (slugParentsJson) {
      Object.keys(slugParentsJson).forEach((s) => {
        slugData.parents[s] = slugParentsJson[s]
      })
    }

    if (archiveIdsJson) {
      Object.keys(archiveIdsJson).forEach((a) => {
        if (slugData.bases?.[a]) {
          slugData.bases[a].archiveId = archiveIdsJson[a]
        }
      })
    }

    if (navDataJson) {
      navData.navs = navDataJson.navs
      navData.items = navDataJson.items
    }
  }

  /* 404 page */

  if (!serverlessData) {
    data.push({
      slug: '404.html',
      output: httpError('404')
    })
  }

  /* Loop through all content types */

  const contentTypes = Object.keys(content)

  for (let c = 0; c < contentTypes.length; c++) {
    const contentType = contentTypes[c]

    for (let i = 0; i < content[contentType].length; i++) {
      const item = await _renderItem({
        item: content[contentType][i],
        contentType,
        serverlessData,
        getLocalData,
        navs,
        navItems
      })

      const {
        serverlessRender = false,
        data: itemData
      } = item

      if (itemData) {
        data.push(itemData)

        if (serverlessRender && !serverlessData) {
          serverlessRoutes.push(itemData.slug)
        }
      }
    }
  }

  /* Render end callback */

  if (onRenderEnd) {
    let jsonData = false

    if (!serverlessData) {
      jsonFileData.slugs.data = _slugs
      jsonFileData.slugParents.data = slugData.parents
      jsonFileData.archiveIds.data = archiveData.ids
      jsonFileData.navData.data = navData

      jsonData = jsonFileData
    }

    onRenderEnd({
      jsonData,
      serverlessRoutes,
      redirects
    })
  }

  /* Output */

  if (serverlessData) {
    return data[0]
  }

  return data
}

/* Exports */

module.exports = render
