/**
 * Render
 */

/* Imports */

import { enumNamespace } from '../vars/enums'
import { getAllData, getSlug, getPermalink } from '../utils'
import { slugData, envData, navData, archiveData, scriptData, jsonFileData } from '../vars/data'
import layout from './layout'
import header from './header'
import footer from './footer'
import button from './button'
import container from './container'
import column from './column'
import richText from './rich-text'
import image from './image'
import video from './video'
import waveSeparator from './wave-separator'
import navigations from './navigations'
import hero from './hero'
import httpError from './http-error'
import aspectRatio from './aspect-ratio'
import posts from './posts'
import { card } from './cards'

/**
 * Store slug data for json
 *
 * @type {object}
 */

const _slugs: object = {}

/**
 * Function - recurse and output nested content
 *
 * @private
 * @param {object} args
 * @param {array<object>} args.contentData
 * @param {object} args.output
 * @param {array<object>} args.parents
 * @param {object} args.navs
 * @return {void}
 */

interface _ContentArgs {
  contentData: any[]
  output: {
    html: string
  }
  parents: Array<{
    renderType: string
    props: object
  }>
  navs: object
}

const _renderContent = async ({
  contentData = [],
  output,
  parents = [],
  navs
}: _ContentArgs): Promise<void> => {
  if (Array.isArray(contentData) && (contentData.length > 0)) {
    for (let i = 0; i < contentData.length; i++) {
      const c = contentData[i]

      /* Check for nested content */

      const children: object[] = c?.content || []
      let recurse = false

      if (children) {
        if (Array.isArray(children)) {
          if (children.length > 0) {
            recurse = true
          }
        }
      }

      /* Render and recursion */

      const props: object = c || {}
      const renderType: string = c?.renderType || ''

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
          /*if (props?.location) {
            const loc = props.location.toLowerCase().replace(/ /g, '')
            const nav = navs?.[loc] ? navs[loc] : ''

            renderObj.start = `<nav aria-label="${props.title}">${nav}</nav>`
          }*/

          break
        }
      }

      const start = renderObj.start
      const end = renderObj.end

      output.html += start

      if (children.length && recurse) {
        const parentsCopy = [...parents]

        parentsCopy.unshift({
          renderType,
          props
        })

        await _renderContent({
          contentData: children,
          output,
          parents: parentsCopy,
          navs
        })
      }

      output.html += end

      /* Clear parents */

      if (renderType !== '' && renderType !== 'content' && end !== '') {
        parents = []
      }
    }
  }
}

/**
 * Function - output single post or page
 *
 * @private
 * @param {object} args
 * @param {object} args.item
 * @param {string} args.contentType
 * @return {object}
 */

interface _ItemArgs {
  item: {
    id: string
    basePermalink?: string
  }
  contentType: string
}

interface _ItemReturn {
  data: {
    slug: string
    output: string
  }
}

const _renderItem = async ({
  item,
  contentType = 'page'
}: _ItemArgs): Promise<_ItemReturn> => {
  /* Item id */

  const id = item.id

  /* Item props */

  const props = Object.assign({
    title: '',
    slug: '',
    archive: '',
    hero: {},
    content: [],
    meta: {
      title: '',
      canonical: '',
      isIndex: false
    },
    passwordProtected: false,
    theme: {},
    svg: false
  }, item)

  /* Meta */

  const title = props.title
  const meta = props.meta || {}

  if (meta?.title === '') {
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

  let slug = ''
  let permalink = ''
  let parents: object[] = []

  if (typeof s === 'object') {
    slug = s.slug
    parents = s.parents
    permalink = getPermalink(s.slug)
    item.basePermalink = getPermalink(s.slug)
  }

  meta.canonical = permalink

  /* Add to data by slugs store */

  _slugs[slug !== 'index' && slug !== '' ? `/${slug}/` : '/'] = {
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
    parents
  })

  /* Hero */

  const heroArgs: Render.HeroArgs = {
    contentType,
    archive: props.archive,
    ...props.hero
  }

  if (props.slug === 'index') {
    heroArgs.type = 'index'
  }

  if (heroArgs.title === '') {
    heroArgs.title = props.title
  }

  const heroOutput = hero(heroArgs)

  /* Main output */

  let output = ''

  /* Content loop */

  const contentOutput = { html: '' }

  const contentData = props.content

  if (Array.isArray(contentData) && contentData.length > 0) {
    await _renderContent({
      contentData,
      output: contentOutput,
      parents: [],
      navs: navsOutput
    })
  }

  output += contentOutput.html

  /* Style */

  let style = ''

  if (props.theme) {
    const styleArray: string[] = []

    Object.keys(props.theme).forEach((t) => {
      const prefix = t.includes('video') ? '' : 'theme-'
      const color = props.theme[t]?.dark ? props.theme[t].dark : props.theme[t]

      styleArray.push(`--${prefix}${t}:${color}`)
    })

    style = `:root{${styleArray.join(';')};--main-button-bg:var(--theme-main)}`
  }

  /* Script data */

  let script = ''

  if (Object.keys(scriptData).length > 0) {
    const scriptJSON = JSON.stringify(scriptData)

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
      slug: slug !== 'index' && slug !== '' ? `/${slug}/` : '/',
      output: layoutOutput
    }
  }
}

/**
 * Function - loop through all content types to output pages and posts
 *
 * @param {object} args
 * @param {object} args.env
 * @param {function} args.onRenderEnd
 * @return {array|object}
 */

interface RenderArgs {
  env?: {
    dev: boolean
    prod: boolean
  }
  onRenderEnd?: Function
}

const render = async ({ env, onRenderEnd }: RenderArgs): Promise<object[]> => {
  /* Set env */

  if (env != null) {
    envData.dev = env.dev
    envData.prod = env.prod
  }

  /* All data */

  const allData = await getAllData('init_all_data')

  if (allData == null) {
    return [{
      slug: '',
      output: ''
    }]
  }

  const {
    content,
    navs,
    navItems,
    redirects,
    archivePosts
  } = allData

  /* Store navigations and items */

  navData.navs = navs
  navData.items = navItems

  /* Store content data */

  const data: object[] = []

  /* Store routes for render end */

  const serverlessRoutes: string[] = []

  /* Loop through pages first to set parent slugs */

  content.page.forEach(item => {
    const { parent, id, archive } = item

    if (archive !== '') {
      archiveData.ids[archive] = id

      if (archivePosts?.[archive] !== '') {
        archiveData.posts[archive] = archivePosts[archive]
      }

      if (slugData.bases?.[archive] !== '') {
        slugData.bases[archive].archiveId = id
      }
    }

    if (parent !== undefined && id !== '') {
      if (parent.slug !== '' && parent.title !== '') {
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
      const item: _ItemReturn = await _renderItem({
        item: content[contentType][i],
        contentType
      })

      data.push(item.data)
    }
  }

  /* Render end callback */

  if (onRenderEnd != null) {
    jsonFileData.slugs.data = JSON.stringify(_slugs)
    jsonFileData.slugParents.data = JSON.stringify(slugData.parents)
    jsonFileData.archiveIds.data = JSON.stringify(archiveData.ids)
    jsonFileData.archivePosts.data = JSON.stringify(archiveData.posts)
    jsonFileData.navData.data = JSON.stringify(navData)

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
