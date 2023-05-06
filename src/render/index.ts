/**
 * Render
 */

/* Imports */

const { enumNamespace } = require('../vars/enums')
const { getAllData, getSlug, getPermalink } = require('../utils')
const { slugData, envData, navData, archiveData, scriptData, jsonFileData } = require('../vars/data')
const layout = require('./layout')
const header = require('./header')
const footer = require('./footer')
const button = require('./button')
const container = require('./container')
const column = require('./column')
const richText = require('./rich-text')
const image = require('./image')
const video = require('./video')
const waveSeparator = require('./wave-separator')
const navigations = require('./navigations')
const hero = require('./hero')
const httpError = require('./http-error')
const aspectRatio = require('./aspect-ratio')
const posts = require('./posts')
const { card } = require('./cards')

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
 *  @prop {object} navs
 * }
 * @return {void}
 */

const _renderContent = async ({
  contentData = [],
  output = {},
  parents = [],
  pageData = {},
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
        case 'aspect-ratio':
          renderObj = aspectRatio({ args: props, parents })
          break
        case 'card':
          renderObj = card({ args: props, parents })
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
        case 'video':
          renderObj.start = video({ args: props, parents })
          break
        case 'wave-separator':
          renderObj.start = waveSeparator()
          break
        case 'posts':
          renderObj.start = posts({ args: props, parents })
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
 * }
 * @return {object}
 */

const _renderItem = async ({
  item = {},
  contentType = 'page'
}) => {
  /* Item id */

  const id = item.id

  /* Item props */

  const props = Object.assign({
    title: '',
    slug: '',
    archive: '',
    hero: {},
    content: [],
    meta: {},
    passwordProtected: false,
    theme: false,
    svg: false
  }, item)

  /* Meta */

  const title = props.title
  const meta = props.meta

  if (!meta?.title) {
    meta.title = title
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

  const heroArgs = {
    contentType,
    archive: props.archive,
    ...props.hero
  }

  if (props.slug === 'index') {
    heroArgs.type = 'index'
  }

  if (!heroArgs.title) {
    heroArgs.title = props.title
  }

  const heroOutput = hero(heroArgs)

  /* Main output */

  let output = ''

  /* Content loop */

  const contentOutput = { html: '' }

  let contentData = props.content

  if (Array.isArray(contentData) && contentData.length) {
    await _renderContent({
      contentData,
      output: contentOutput,
      parents: [],
      pageData: item,
      navs: navsOutput
    })
  }

  output += contentOutput.html

  /* Style */

  let style = ''

  if (item.theme) {
    const styleArray = []

    Object.keys(item.theme).forEach((t) => {
      const prefix = t.includes('video') ? '' : 'theme-'
      const color = item.theme[t]?.dark ? item.theme[t].dark : item.theme[t]

      styleArray.push(`--${prefix}${t}:${color}`)
    })

    style = `:root{${styleArray.join(';')};--main-button-bg:var(--theme-main)}`
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
    script,
    style
  })

  return {
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
 *  @prop {object} env
 *  @prop {function} onRenderEnd
 * }
 * @return {array|object}
 */

const render = async ({ env, onRenderEnd }): Promise<object[]> => {
  /* Set env */

  if (env) {
    envData.dev = env.dev
    envData.prod = env.prod
  }

  /* All data */

  const allData = await getAllData('init_all_data')

  if (!allData) {
    return [{
      slug: '',
      output: ''
    }]
  }

  const {
    content = {},
    navs = [],
    navItems = [],
    redirects = [],
    archivePosts = {}
  } = allData

  /* Store navigations and items */

  navData.navs = navs
  navData.items = navItems

  /* Store content data */

  const data = []

  /* Store routes for render end */

  const serverlessRoutes = []

  /* Loop through pages first to set parent slugs */

  content.page.forEach(item => {
    let { parent, id, archive } = item

    if (archive) {
      archiveData.ids[archive] = id

      if (archivePosts?.[archive]) {
        archiveData.posts[archive] = archivePosts[archive]
      }

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

  /* 404 page */

  data.push({
    slug: '404.html',
    output: await httpError('404')
  })

  /* Loop through all content types */

  const contentTypes = Object.keys(content)

  for (let c = 0; c < contentTypes.length; c++) {
    const contentType = contentTypes[c]

    for (let i = 0; i < content[contentType].length; i++) {
      const item = await _renderItem({
        item: content[contentType][i],
        contentType
      })

      const { data: itemData } = item

      if (itemData) {
        data.push(itemData)
      }
    }
  }

  /* Render end callback */

  if (onRenderEnd) {
    jsonFileData.slugs.data = _slugs
    jsonFileData.slugParents.data = slugData.parents
    jsonFileData.archiveIds.data = archiveData.ids
    jsonFileData.archivePosts.data = archiveData.posts
    jsonFileData.navData.data = navData

    onRenderEnd({
      jsonData: jsonFileData,
      serverlessRoutes,
      redirects
    })
  }

  /* Output */

  return data
}

/* Exports */

export default render
