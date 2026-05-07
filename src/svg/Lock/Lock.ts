/**
 * Svg - Lock
 */

/* Imports */

import type { SvgArgs } from '../svgTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { configVars } from '../../config/config.js'

/**
 * Output svg lock icon.
 *
 * @param {SvgArgs} [args]
 * @return {string} SVGElement
 */
const LockSvg = (args?: SvgArgs): string => {
  /* Args */

  const {
    width = 'xs',
    height = 'xs',
    classes
  } = isObjectStrict(args) ? args : {}

  /* Add to svg sprite */

  const viewBox = '0 0 20 20'
  const id = 'svg-lock'

  configVars.svg.set(id, {
    viewBox,
    output: `
      <path d="M4.95 17.92c-.33 0-.61-.12-.85-.36a1.16 1.16 0 0 1-.36-.85V8.37c0-.33.12-.62.36-.85.24-.23.52-.35.85-.35H6.4V5.26c0-1 .35-1.85 1.05-2.55.7-.7 1.55-1.05 2.55-1.05s1.85.35 2.55 1.05c.7.7 1.05 1.55 1.05 2.55v1.91h1.45c.33 0 .61.12.85.35.24.23.36.52.36.85v8.34c0 .33-.12.61-.36.85s-.52.36-.85.36H4.95Zm0-.95h10.1c.07 0 .14-.02.18-.07a.24.24 0 0 0 .07-.18V8.38c0-.07-.02-.14-.07-.18a.24.24 0 0 0-.18-.07H4.95c-.07 0-.14.02-.18.07a.24.24 0 0 0-.07.18v8.34c0 .07.02.14.07.18.05.05.11.07.18.07ZM10 13.96c.39 0 .72-.14 1-.41.28-.27.41-.6.41-.98s-.14-.7-.42-1c-.28-.29-.61-.44-1-.44s-.72.15-1 .44c-.28.29-.41.63-.41 1.01s.14.7.42.97c.28.27.61.41 1 .41ZM7.34 7.18h5.3V5.27c0-.74-.26-1.36-.77-1.88-.52-.52-1.14-.77-1.88-.77s-1.36.26-1.88.77a2.55 2.55 0 0 0-.78 1.88v1.91Z" fill="currentcolor" />
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

export { LockSvg }
