/**
 * Render - layout
 */

/* Imports */

const { envData } = require('../vars/data')
const { enumNamespace, enumSite, enumColors } = require('../vars/enums')
const { getPermalink } = require('../utils')

/**
 * Function - output html
 *
 * @param {object} args {
 *  @prop {object} meta
 *  @prop {string} content
 *  @prop {string} script
 * }
 * @return {string} HTML - html
 */

const layout = ({
  meta = {},
  content = '',
  script = ''
}) => {
  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Title */

  const title = (meta?.title ? `${meta.title} | ` : '') + enumSite.title

  /* Description */

  const description = meta?.description ? meta.description : enumSite.meta.description

  /* Image */

  const image = meta?.image ? `https:${meta.image.fields.file.url}` : `${assetsLink}${enumSite.meta.image}`

  /* Canonical */

  const canonical = meta?.canonical ? `<link rel="canonical" href="${meta.canonical}">` : ''

  /* Prev */

  const prev = meta?.prev ? `<link rel="prev" href="${meta.prev}">` : ''

  /* Next */

  const next = meta?.next ? `<link rel="next" href="${meta.next}">` : ''

  /* No index */

  /*let noIndex = meta?.noIndex ? meta.noIndex : false

  if (envData.dev) {
    noIndex = true
  }*/

  const noIndex = true

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/larsseit.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="${assetsLink}fonts/larsseit-medium.woff2" as="font" type="font/woff2" crossorigin>
  `

  /* Output */

  return `
    <!DOCTYPE html>
    <html lang="en" id="${enumNamespace}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <meta name="image" content="${image}">
        <meta property="og:url" content="">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${image}">
        <meta content="summary_large_image" property="twitter:card">
        ${preloadFonts}
        <link rel="stylesheet" href="${assetsLink}css/${enumNamespace}.css" media="all">
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="${enumColors.foreground.base}">
        <meta name="msapplication-TileColor" content="${enumColors.foreground.base}">
        <meta name="theme-color" content="${enumColors.foreground.base}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${enumNamespace} no-js l-flex l-flex-column">
        ${content}
        ${script}
        <script type="module" src="${assetsLink}js/${enumNamespace}.js"></script>
      </body>
    </html>
  `
}

/* Exports */

module.exports = layout
