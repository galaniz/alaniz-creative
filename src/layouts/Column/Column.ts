/**
 * Layouts - Column
 */

/* Imports */

import type { ColumnProps } from './ColumnTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Filter formation column props.
 *
 * @param {ColumnProps} props
 * @return {ColumnProps}
 */
const Column = (props: ColumnProps): ColumnProps => {
  /* Props and args */

  const { args } = props
  const newArgs = { ...args }
  const {
    widthSmall,
    widthMedium,
    widthLarge,
    widthCustom,
    justify,
    align,
    classes,
    grow = false,
    style,
    position
  } = newArgs

  let { width } = newArgs

  /* Classes */

  const classesArr: string[] = []

  /* Width */

  const isWidthCustom = isObjectStrict(widthCustom)

  if (!isStringStrict(width) && !isWidthCustom) {
    width = '12'
  }

  if (isStringStrict(width)) {
    classesArr.push(`col-${width}`)
  }

  if (isStringStrict(widthSmall)) {
    classesArr.push(`col-${widthSmall}-s`)
  }

  if (isStringStrict(widthMedium)) {
    classesArr.push(`col-${widthMedium}-m`)
  }

  if (isStringStrict(widthLarge)) {
    classesArr.push(`col-${widthLarge}-l`)
  }

  /* Flex */

  const hasJustify = isStringStrict(justify)
  const hasAlign = isStringStrict(align)

  if (hasJustify || hasAlign || grow) {
    classesArr.push('flex col')
  }

  /* Justify */

  if (hasJustify) {
    classesArr.push(`justify-${justify}`)
  }

  /* Align */

  if (hasAlign) {
    classesArr.push(`align-${align}`)
  }

  /* Grow */

  if (grow) {
    classesArr.push('grow-1')
  }

  /* Position */

  if (isStringStrict(position)) {
    classesArr.push('absolute')

    if (position === 'top-left') {
      classesArr.push('top-0 left-0')
    }

    if (position === 'top-left-10') {
      classesArr.push('top-0 left-1-10')
    }

    if (position === 'top-right') {
      classesArr.push('top-0 right-0')
    }

    if (position === 'top-right-10') {
      classesArr.push('top-0 right-1-10')
    }

    if (position === 'bottom-left') {
      classesArr.push('bottom-0 left-0')
    }

    if (position === 'bottom-left-10') {
      classesArr.push('bottom-0 left-1-10')
    }

    if (position === 'bottom-right') {
      classesArr.push('bottom-0 right-0')
    }

    if (position === 'bottom-right-10') {
      classesArr.push('bottom-0 right-1-10')
    }
  }

  /* Styles */

  const stylesArr: string[] = []

  if (isStringStrict(style)) {
    stylesArr.push(style)
  }

  if (isWidthCustom) {
    classesArr.push('col-custom')

    const styleArray = [
      `--col:${(widthCustom.init || 100) * 12 / 100}`,
      `--col-small:${(widthCustom.small || 100) * 12 / 100}`,
      `--col-medium:${(widthCustom.medium || 100) * 12 / 100}`,
      `--col-large:${(widthCustom.large || 100) * 12 / 100}`
    ]

    stylesArr.push(styleArray.join(';'))
  }

  if (stylesArr.length) {
    newArgs.style = stylesArr.join(';')
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/* Exports */

export { Column }
