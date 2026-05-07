/**
 * Svg - Info
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg info icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const InfoSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-info'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M9.44 14.17h1.25v-5H9.44v5ZM10 7.63a.67.67 0 0 0 .69-.66c0-.2-.07-.37-.2-.5-.13-.14-.29-.2-.49-.2s-.36.07-.49.2a.7.7 0 0 0-.2.5c0 .19.07.35.2.47.13.13.29.19.49.19Zm0 10.71a8.49 8.49 0 0 1-7.68-5.1c-.44-1.01-.66-2.09-.66-3.24s.22-2.23.66-3.24a8.33 8.33 0 1 1 7.67 11.59Z" fill="currentcolor" />
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

export { InfoSvg }
