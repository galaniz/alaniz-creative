/**
 * Render - layout
 */

/* Imports */

import { envData, scriptData } from '../../vars/data'
import { enumNamespace, enumSite, enumColors } from '../../vars/enums'
import { getPermalink } from '../../utils'

/**
 * Function - output html
 *
 * @param {object} args
 * @prop {object} args.meta
 * @prop {string} args.content
 * @prop {string} args.style
 * @prop {class} args.PurgeCSS
 * @return {string} HTML - html
 */

interface Args {
  meta?: {
    title?: string
    description?: string
    image?: string
    canonical?: string
    prev?: string
    next?: string
    noIndex?: boolean
  }
  content?: string
  style?: string
  PurgeCSS?: any
}

interface Purge {
  css: string
}

const layout = async ({
  meta = {},
  content = '',
  style = '',
  PurgeCSS
}: Args): Promise<string> => {
  /* Assets link */

  const assetsLink = `${getPermalink()}assets/`

  /* Title */

  const title = (meta?.title !== undefined ? `${meta.title} | ` : '') + enumSite.title

  /* Description */

  const description = meta?.description !== undefined ? meta.description : enumSite.meta.description

  /* Image */

  const image = meta?.image !== undefined ? `${assetsLink}${meta.image}` : `${assetsLink}${enumSite.meta.image}`

  /* Canonical */

  const canonical = meta?.canonical !== undefined ? `<link rel="canonical" href="${meta.canonical}">` : ''

  /* Prev */

  const prev = meta?.prev !== undefined ? `<link rel="prev" href="${meta.prev}">` : ''

  /* Next */

  const next = meta?.next !== undefined ? `<link rel="next" href="${meta.next}">` : ''

  /* No index */

  let noIndex = meta?.noIndex !== undefined ? meta.noIndex : false

  if (envData.dev) {
    noIndex = true
  }

  /* Preload font links */

  const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/larsseit.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="${assetsLink}fonts/larsseit-medium.woff2" as="font" type="font/woff2" crossorigin>
  `

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

  Object.keys(scriptData).forEach(k => delete scriptData[k]) // eslint-disable-line @typescript-eslint/no-dynamic-delete

  /* Output */

  const output = `
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
        <style>
          @media (prefers-reduced-motion: reduce) {
            .reduce-motion-show {
              display: block;
            }

            .reduce-motion-hide {
              display: none;
            }
          }
        </style>
        *|CSS|*
        ${style !== '' ? `<style>${style}</style>` : ''}
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

  /* Purge unused css */

  let cssOutput = `<link rel="stylesheet" href="${assetsLink}css/${enumNamespace}.css" media="all">`

  if (envData.build && PurgeCSS !== undefined) {
    const purge: Purge[] = await new PurgeCSS().purge({
      content: [
        {
          raw: output,
          extension: 'html'
        }
      ],
      css: [
        `./site/assets/css/${enumNamespace}.css`
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
