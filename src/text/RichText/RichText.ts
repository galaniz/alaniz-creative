/**
 * Text - Rich Text
 */

/* Imports */

import type {
  RichTextContentItemFilter,
  RichTextPropsFilter
} from '@alanizcreative/formation-static/text/RichText/RichTextTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

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

  /* Parent */

  const parent = parents[0]
  const hasParent = isObjectStrict(parent)
  const parentType = hasParent ? parent.renderType : ''

  /* Type */

  if (type === 'normal') {
    classesArr.push('wt-normal')
  }

  if (type === 'columns') {
    classesArr.push('text-col-2')
  }

  /* Card */

  if (parentType === 'card' && tag === 'p') {
    classesArr.push('current')
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
    stylesArr.push(`color:var(--${color})`)
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

  if (tag === 'th') {
    newItem.attr = 'scope="col"'
  }

  if (tag === 'cite') {
    newItem.attr = 'class="text-s mt-2xs"'
  }

  if (tag === 'dt' && type === 'columns') {
    newItem.attr = 'class="text-span"'
  }

  return newItem
}

/* Exports */

export {
  RichTextProps,
  RichTextContentItem
}
