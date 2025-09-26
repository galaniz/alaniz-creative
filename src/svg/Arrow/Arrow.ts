/**
 * Svg - Arrow
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg arrow icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const ArrowSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-arrow'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="m9.31 16.23-5.79-5.79a.69.69 0 0 1-.15-.21c-.03-.07-.04-.15-.04-.23s.01-.16.04-.23a.69.69 0 0 1 .15-.21l5.81-5.81c.11-.11.25-.17.42-.17s.31.06.44.19.19.27.19.44-.06.31-.19.44L5.46 9.38h10.33a.61.61 0 0 1 .63.63.61.61 0 0 1-.63.63H5.46l4.75 4.75c.11.11.17.25.17.42s-.06.31-.19.44-.27.19-.44.19-.31-.06-.44-.19Z" fill="currentcolor" />
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

export { ArrowSvg }
