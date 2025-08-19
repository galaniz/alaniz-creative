/**
 * Svg - External
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg external link icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const ExternalSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-external'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M4.17 5.62c-.28 0-.54.11-.74.31s-.31.46-.31.74v9.17c0 .28.11.54.31.74.2.2.46.31.74.31h9.17c.28 0 .54-.11.74-.31.2-.2.31-.46.31-.74v-5c0-.35.28-.62.62-.62s.62.28.62.62v5a2.29 2.29 0 0 1-2.29 2.29H4.17a2.29 2.29 0 0 1-2.29-2.29V6.67a2.29 2.29 0 0 1 2.29-2.29h5c.35 0 .62.28.62.62s-.28.62-.62.62h-5Zm13.91-3.37c-.02-.05-.06-.09-.09-.14l-.04-.07-.04-.03-.16-.11a.69.69 0 0 0-.24-.05h-5c-.35 0-.62.28-.62.62s.28.62.62.62H16l-8.11 8.13a.63.63 0 0 0 0 .88c.24.24.64.24.88 0l8.1-8.1v3.49c0 .35.28.62.62.62s.62-.28.62-.62V2.5a.64.64 0 0 0-.05-.24Z" fill="currentcolor" />
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
      ${classesArr.length ? ` class="${classesArr.join(' ')}"` : ''}
    >
      <use xlink:href="#${id}" />
    </svg>
  `
}

/* Exports */

export { ExternalSvg }
