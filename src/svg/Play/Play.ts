/**
 * Svg - Play
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg play icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const PlaySvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-play'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M19.02 8.3a1.96 1.96 0 0 1 0 3.4L5.11 19.73a1.97 1.97 0 0 1-2.95-1.7V1.97A1.97 1.97 0 0 1 5.11.27L19.02 8.3Z" fill="currentcolor" />
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

export { PlaySvg }
