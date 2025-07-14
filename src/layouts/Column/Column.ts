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
    style
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

  /* Styles */

  const stylesArr: string[] = []

  if (isStringStrict(style)) {
    stylesArr.push(style)
  }

  if (isWidthCustom) {
    classesArr.push('w-custom')

    const styleArray = [
      `--width:${widthCustom.init || 100}%`,
      `--width-small:${widthCustom.small || 100}%`,
      `--width-medium:${widthCustom.medium || 100}%`,
      `--width-large:${widthCustom.large || 100}`
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
