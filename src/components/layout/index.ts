/**
 * Components - layout
 */

/* Imports */

import { PurgeCSS } from 'purgecss'
import getPermalink from '@alanizcreative/static-site-formation/src/utils/get-permalink'
import config from '../../config'
import header from '../header'
import footer from '../footer'
import hero from '../hero'
import related from '../related'
import term from '../term'

/**
 * Function - output html
 *
 * @param {object} args
 * @param {object} args.meta
 * @param {object} args.navigations
 * @param {string} args.content
 * @param {array<string>} args.contains
 * @param {object} args.data
 * @param {object|undefined} args.serverlessData
 * @return {string} HTML - html
 */

interface LayoutPurge {
  css: string
}

const layout = async ({
  meta,
  navigations,
  content = '',
  contentType = 'page',
  data
}: FRM.LayoutArgs): Promise<string> => {
  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Namespace */

  const ns = config.namespace

  /* Meta */

  let {
    title = '',
    description = '',
    url = '',
    image = '',
    canonical = '',
    prev = '',
    next = '',
    noIndex = false,
    isIndex = false
  } = meta

  /* Data */

  const d: FRM.RenderItem = Object.assign({
    title: '',
    hero: {},
    archive: '',
    related: [],
    theme: {},
    id: ''
  }, data)

  /* Title */

  if (title === '') {
    title = config.title
  } else {
    title = `${title} | ${config.title}`
  }

  /* Description */

  if (description === '') {
    description = config.meta.description
  }

  /* Image */

  if (image === '') {
    image = config.meta.image
  }

  image = `${assetsLink}${image}`

  /* Canonical */

  if (canonical !== '') {
    canonical = `<link rel="canonical" href="${canonical}">`
  }

  /* Prev */

  if (prev !== '') {
    prev = `<link rel="prev" href="${prev}">`
  }

  /* Next */

  if (next !== '') {
    next = `<link rel="next" href="${next}">`
  }

  /* No index */

  if (config.env.dev) {
    noIndex = true
  }

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/larsseit.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="${assetsLink}fonts/larsseit-medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  `

  /* Script data */

  let script = ''

  if (Object.keys(config.script).length > 0) {
    const scriptJSON = JSON.stringify(config.script)

    script = `
      <script>
        var namespace = '${ns}';
        var ${ns} = ${scriptJSON};
      </script>
    `
  }

  /* Clear script data */

  config.script = {}

  /* Theme color */

  const theme: string = config.theme

  /* Header and footer */

  let headerOutput = ''
  let footerOutput = ''

  if (navigations !== undefined) {
    headerOutput = header(navigations)
    footerOutput = footer(navigations)
  }

  /* Hero */

  let heroOutput = ''

  /* Hero */

  let heroArgs: AC.HeroArgs = {
    contentType,
    archive: d.archive
  }

  if (d.hero !== undefined) {
    heroArgs = { ...heroArgs, ...d.hero }
  }

  if (isIndex) {
    heroArgs.type = 'index'
  }

  if (heroArgs.title === undefined) {
    heroArgs.title = d.title
  }

  heroOutput = hero(heroArgs)

  /* Content */

  let contentOutput: string = content

  if (d.related.length > 0) {
    const r = related({
      contentType,
      posts: d.related
    })

    if (r !== '') {
      contentOutput += r
    }
  }

  if (config.taxonomy?.[contentType] !== undefined && d.id !== '') {
    contentOutput += term(contentType, '', d.id)
  }

  /* Style */

  let style = ''

  if (Object.keys(d.theme).length > 0) {
    const styleArray: string[] = []

    Object.keys(d.theme).forEach((t) => {
      const prefix = t.includes('video') ? '' : 'theme-'
      const color = d.theme[t]?.dark !== undefined ? d.theme[t].dark : d.theme[t]

      if (typeof color === 'string') {
        styleArray.push(`--${prefix}${t}:${color}`)
      }
    })

    if (styleArray.length > 0) {
      style = `:root{${styleArray.join(';')};--main-button-bg:var(--theme-main)}`
    }
  }

  /* Output */

  const output = `
    <!DOCTYPE html>
    <html lang="en" id="${ns}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${preloadFonts}
        ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <meta name="image" content="${image}">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${image}">
        <meta content="summary_large_image" property="twitter:card">
        <style>@media (prefers-reduced-motion: reduce) {.reduce-motion-show {display: block;}.reduce-motion-hide {display: none;}}</style>
        *|CSS|*
        ${style !== '' ? `<style>${style}</style>` : ''}
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="${theme}">
        <meta name="msapplication-TileColor" content="${theme}">
        <meta name="theme-color" content="${theme}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${ns} no-js l-flex l-flex-column">
        ${headerOutput}
        <main id="main">
          ${heroOutput}
          ${contentOutput}
        </main>
        ${footerOutput}
        ${script}
        <script type="module" src="${assetsLink}js/${ns}.js"></script>
      </body>
    </html>
  `

  /* Purge unused css */

  let cssOutput = `<link rel="stylesheet" href="${assetsLink}css/${ns}.css" media="all">`

  if (config.env.build && PurgeCSS !== undefined) {
    const purge: LayoutPurge[] = await new PurgeCSS().purge({
      content: [
        {
          raw: output,
          extension: 'html'
        }
      ],
      css: [
        `./site/assets/css/${ns}.css`
      ],
      safelist: [
        'o-form__error',
        'l-flex',
        'l-gap-margin-4xs',
        'l-padding-top-3xs',
        't-line-height-0',
        'l-width-xs',
        'l-height-s',
        't-s',
        't-weight-medium'
      ],
      dynamicAttributes: [
        'data-open',
        'data-overflow',
        'data-show-items',
        'data-show',
        'data-visible',
        'data-state',
        'data-using-mouse',
        'data-no-scroll',
        'data-hide'
      ]
    })

    if (purge.length !== 0) {
      cssOutput = `<style>${purge[0].css}</style>`
    }
  }

  /* Output */

  return output.replace('*|CSS|*', cssOutput)
}

/* Exports */

export default layout
