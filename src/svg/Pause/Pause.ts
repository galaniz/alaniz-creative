/**
 * Svg - Pause
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg pause icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const PauseSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-pause'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M4.09 0c.75 0 1.36.61 1.36 1.36v17.27a1.36 1.36 0 0 1-2.72 0V1.36C2.73.61 3.34 0 4.09 0Zm11.82 0c.75 0 1.36.61 1.36 1.36v17.27a1.36 1.36 0 0 1-2.72 0V1.36c0-.75.61-1.36 1.36-1.36Z" fill="currentcolor" />
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

export { PauseSvg }
