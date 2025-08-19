/**
 * Components - Layout
 */

/* Imports */

import type { LayoutArgs } from './LayoutTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { getPermalink } from '@alanizcreative/formation-static/utils/link/link.js'
import {
  scripts,
  outputScripts,
  outputStyles
} from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { config, configVars } from '../../config/config.js'
import { Seo, seoSchema } from '../../seo/Seo.js'
import { Header } from '../Header/Header.js'
import { Footer } from '../Footer/Footer.js'
import { Hero } from '../Hero/Hero.js'

/**
 * Output html.
 *
 * @param {LayoutArgs} args
 * @return {string} HTMLHtmlElement
 */
const Layout = (args: LayoutArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    slug,
    content,
    itemData,
    meta
  } = args

  /* Page data */

  const { baseType, hero, theme } = itemData

  /* Assets link */

  const baseLink = getPermalink()
  const fontsLink = `${baseLink}fonts/`
  const faviconLink = `${baseLink}favicon/`
  const assetsLink = `${baseLink}assets/`

  /* Namespace */

  const ns = config.namespace

  /* Header */

  const headerOutput = Header(slug, baseType)

  /* Footer */

  const footerOutput = Footer(slug, baseType)

  /* Hero */

  const heroOutput = Hero({
    ...itemData,
    ...hero
  })

  /* Seo */

  const seoOutput = Seo(meta, itemData, assetsLink, slug === '/')

  seoSchema.clear()

  /* Script data */

  const scriptJson = JSON.stringify(scripts.meta)
  const scriptMeta = /* html */`
    <script>
      var namespace = '${ns}';
      var ${ns} = ${scriptJson};
    </script>
  `

  /* Scripts */

  let scriptsOutput = ''

  if (configVars.js.out) {
    scriptsOutput += `<script type="module" src="${assetsLink}${configVars.js.out}.js"></script>`
  }

  scriptsOutput += outputScripts(assetsLink)

  /* Styles */

  configVars.css.replace =
    `<link rel="stylesheet" href="${assetsLink}${configVars.css.out}.css" media="all">` + outputStyles(assetsLink)

  let stylesOutput =
    '@media (prefers-reduced-motion:reduce){.no-motion-show{display:block}.no-motion-hide{display:none}}'

  if (isObjectStrict(theme)) {
    const styleProps: string[] = []

    Object.entries(theme).forEach(([themeKey, themeValue]) => {
      styleProps.push(`--${themeKey.startsWith('video') ? '' : 'theme-'}${themeKey}:${themeValue}`)
    })

    stylesOutput += `:root{${styleProps.join(';')};--btn-fill:var(--theme-primary);--btn-stroke:var(--theme-primary)}`
  }

  /* Svg sprites */

  let spritesOutput = ''

  for (const [svgId, svgData] of configVars.svg) {
    const {
      viewBox,
      output
    } = svgData

    spritesOutput += `<symbol id="${svgId}" viewBox="${viewBox}">${output}</symbol>`
  }

  if (spritesOutput) {
    spritesOutput = /* html */`
      <svg xmlns="http://www.w3.org/2000/svg" class="none">
        ${spritesOutput}
      </svg>
    `
  }

  configVars.svg.clear()

  /* Templates */

  let templatesOutput = ''

  for (const [templateId, template] of configVars.template) {
    templatesOutput += /* html */`
      <template id="${templateId}">
        ${template}
      </template>
    `
  }

  configVars.template.clear()

  /* Noscript */

  let noscriptOutput = `<link rel="stylesheet" href="${assetsLink}css/global/globalNoJs.css" media="all">`

  configVars.noscript.forEach(noscript => {
    noscriptOutput += noscript
  })

  configVars.noscript.clear()

  /* Check if local */

  const isLocal = configVars.local

  /* Hot reload */

  let reloadScript = ''

  if (isLocal) {
    reloadScript = /* html */`
      <script>
        const esbuild = new EventSource('/esbuild')
        esbuild.addEventListener('change', () => { location.reload() })
      </script>
    `
  }

  /* Output */

  return /* html */`
    <!DOCTYPE html>
    <html lang="en-CA" id="${ns}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preload" href="${fontsLink}larsseit.woff2" as="font" type="font/woff2" crossorigin="anonymous">
        <link rel="preload" href="${fontsLink}larsseit-medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
        ${seoOutput}
        ${configVars.css.replace}
        <style>${stylesOutput}</style>
        <noscript>${noscriptOutput}</noscript>
        <link rel="icon" href="${faviconLink}favicon-32x32.png" sizes="32x32">
        <link rel="icon" href="${faviconLink}favicon-192x192.png" sizes="192x192">
        <link rel="icon" href="${faviconLink}favicon-512x512.png" sizes="512x512">
        <link rel="apple-touch-icon" href="${faviconLink}favicon-180x180.png">
      </head>
      <body class="${ns} no-js flex col">
        ${spritesOutput}
        ${headerOutput}
        <main id="main">
          ${heroOutput}
          ${content}
        </main>
        ${footerOutput}
        ${scriptMeta}
        ${templatesOutput}
        ${scriptsOutput}
        ${reloadScript}
      </body>
    </html>
  `
}

/* Exports */

export { Layout }
