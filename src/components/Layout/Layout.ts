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
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { config, configVars } from '../../config/config.js'
import { Seo, seoSchema } from '../../seo/Seo.js'
import { Header } from '../Header/Header.js'
import { Footer } from '../Footer/Footer.js'
import { Hero } from '../Hero/Hero.js'
import { Single } from '../Single/Single.js'

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
    contentType,
    content,
    itemData,
    meta
  } = args

  /* Page data */

  const {
    baseType,
    hero,
    theme,
    passwordProtect,
    template
  } = itemData

  /* Assets link */

  const baseLink = getPermalink()
  const fontsLink = `${baseLink}fonts/`
  const faviconLink = `${baseLink}favicon/`
  const assetsLink = `${baseLink}assets/`

  /* Namespace */

  const ns = config.namespace

  /* Template */

  const isBlank = template === 'blank'

  /* Password protect */

  if (passwordProtect) {
    setStoreItem('serverless', [], slug)
  }

  /* Header, footer and hero */

  let headerOutput = ''
  let footerOutput = ''
  let heroOutput = ''

  if (!isBlank) {
    headerOutput = Header(slug, baseType)
    footerOutput = Footer(slug, baseType)
    heroOutput = Hero({
      ...itemData,
      ...hero
    })
  }

  /* Content */

  let contentOutput = content

  if (contentType === 'work') {
    contentOutput = Single(content, contentType, itemData)
  }

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

  configVars.style.forEach(s => {
    stylesOutput += s
  })

  configVars.style.clear()

  if (isObjectStrict(theme)) {
    const styleProps: string[] = []
    const stylePropsDark: string[] = []
    const stylePropsLight: string[] = []

    Object.entries(theme).forEach(([themeKey, themeValue]) => {
      const themeKeyPre = themeKey.startsWith('med') ? '' : 'theme-'

      styleProps.push(`--${themeKeyPre}${themeKey}:${themeValue}`)

      if (themeKey.endsWith('dark')) {
        stylePropsDark.push(`--${themeKeyPre}${themeKey.replace('-dark', '')}:var(--${themeKeyPre}${themeKey})`)
      }

      if (themeKey.endsWith('light')) {
        stylePropsLight.push(`--${themeKeyPre}${themeKey.replace('-light', '')}:var(--${themeKeyPre}${themeKey})`)
      }
    })

    stylesOutput += `:root{${styleProps.join(';')};--btn-fill:var(--theme-color);--btn-stroke:var(--theme-color)}`

    if (stylePropsDark.length) {
      stylesOutput += `.bg-background-light{${stylePropsDark.join(';')}}`
    }

    if (stylePropsLight.length) {
      stylesOutput += `.bg-foreground-base{${stylePropsLight.join(';')}}`
    }
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
    <html lang="en-CA" id="${ns}" class="bg-background-light" data-root>
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
        <main id="main" class="${isBlank ? 'flex col justify-center grow-1' : 'pb-3xs'}">
          ${heroOutput}
          ${contentOutput}
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
