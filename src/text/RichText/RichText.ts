/**
 * Text - Rich Text
 */

/* Imports */

import type {
  RichTextContentItemFilter,
  RichTextPropsFilter
} from '@alanizcreative/formation-static/text/RichText/RichTextTypes.js'
import type { ContainerArgs } from '../../layouts/Container/ContainerTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'

/**
 * Filter formation rich text props.
 *
 * @type {RichTextPropsFilter}
 */
const RichTextProps: RichTextPropsFilter = (props) => {
  /* Props and args */

  const { args, parents = [] } = props
  const newArgs = { ...args }
  const {
    tag,
    color,
    align,
    type,
    classes
  } = newArgs

  /* Classes */

  const classesArr: string[] = []
  const stylesArr: string[] = []

  /* Data attribute */

  let dataAttr = false

  /* Parents */

  const parent = parents[0]

  /* Content ascendant */

  if (isObjectStrict(parent) && parent.renderType === 'container') {
    const { richTextStyles = false } = parent.args as ContainerArgs

    dataAttr = richTextStyles
  }

  /* Type */

  if (type === 'normal') {
    classesArr.push('wt-normal')
  }

  if (type === 'columns') {
    classesArr.push('text-col-2')
  }

  /* Quote */

  if (tag === 'blockquote') {
    classesArr.push('text-quote')
  }

  /* Align */

  if (isStringStrict(align)) {
    newArgs.align = `text-${align}`
  }

  /* Color */

  if (isStringStrict(color)) {
    classesArr.push('themeable theme')
    stylesArr.push(`--ac-theme-dark:var(--ac-${color}-dark);--ac-theme-light:var(--ac-${color}-light)`)
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')

  /* Styles */

  if (stylesArr.length) {
    newArgs.style = stylesArr.join(';')
  }

  /* Data attribute */

  newArgs.dataAttr = dataAttr

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/**
 * Filter formation rich text content item.
 *
 * @type {RichTextOutputFilter}
 */
const RichTextContentItem: RichTextContentItemFilter = (item, props) => {
  const { tag } = item
  const { args } = props
  const { type } = args
  const newItem = { ...item }
  const isCols = type === 'columns'

  if (tag === 'th') {
    newItem.attr = 'scope="col"'
  }

  if (tag === 'cite') {
    newItem.attr = 'class="text-s mt-2xs block"'
  }

  if (isCols && tag === 'dd') {
    newItem.attr = 'class="text-no-br"'
  }

  if (isCols && tag === 'dt') {
    newItem.attr = 'class="text-span"'
  }

  return newItem
}

/* Exports */

export {
  RichTextProps,
  RichTextContentItem
}
