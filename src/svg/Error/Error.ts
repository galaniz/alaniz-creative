/**
 * Svg - Error
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg error icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const ErrorSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-error'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M2.6 17.08a.57.57 0 0 1-.53-.3.55.55 0 0 1-.01-.59L9.48 3.4c.12-.19.3-.29.52-.29s.4.1.52.29l7.42 12.79c.11.19.11.39-.01.59-.12.2-.3.3-.53.3H2.6Zm7.46-8.77a.46.46 0 0 0-.34.14.45.45 0 0 0-.14.32v3.6c0 .14.05.25.14.34.09.09.2.14.34.14s.25-.05.34-.14c.09-.09.14-.2.14-.34v-3.6c0-.12-.05-.23-.15-.32s-.21-.14-.33-.14Zm0 6.58a.5.5 0 0 0 .38-.16c.1-.1.15-.23.15-.39a.43.43 0 0 0-.16-.35.5.5 0 0 0-.36-.15.48.48 0 0 0-.37.15.5.5 0 0 0-.15.38c0 .14.05.26.15.36.1.1.22.16.37.16Z" fill="currentcolor" />
    `
  })

  /* Classes */

  const classesArr = [
    `w-${width}`,
    `h-${height}`
  ]

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  /* Output */

  return /* html */`
    <svg
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      role="img"
      class="${classesArr.join(' ')}"
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { ErrorSvg }
