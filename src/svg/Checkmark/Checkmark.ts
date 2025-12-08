/**
 * Svg - Checkmark
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg checkmark icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const CheckmarkSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-checkmark'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M8.77 12.08 6.65 9.95c-.08-.1-.19-.15-.33-.15s-.26.05-.35.15c-.11.11-.17.24-.17.38s.05.26.15.35l2.42 2.4c.11.12.25.19.42.19s.31-.06.42-.19l4.85-4.83c.1-.1.15-.22.15-.35s-.06-.26-.17-.35c-.1-.1-.22-.15-.35-.15s-.26.05-.38.15l-4.52 4.54ZM10 17.91c-1.11 0-2.15-.2-3.11-.6a7.53 7.53 0 0 1-2.52-1.68A7.9 7.9 0 0 1 2.09 10a7.92 7.92 0 0 1 2.28-5.61 7.92 7.92 0 0 1 8.72-1.69 7.88 7.88 0 0 1 4.82 7.3A7.84 7.84 0 0 1 10 17.91Z" fill="currentcolor" />
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

export { CheckmarkSvg }
