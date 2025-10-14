/**
 * Layouts - Container
 */

/* Imports */

import type { ContainerProps } from './ContainerTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Filter formation container props.
 *
 * @param {ContainerProps} props
 * @return {ContainerProps}
 */
const Container = (props: ContainerProps): ContainerProps => {
  /* Props and args */

  const { args } = props
  const newArgs = { ...args }
  const {
    tag = 'div',
    layout = 'block',
    maxWidth,
    background,
    paddingTop,
    paddingTopLarge,
    paddingBottom,
    paddingBottomLarge,
    paddingLeft,
    paddingLeftLarge,
    paddingRight,
    paddingRightLarge,
    gap,
    gapLarge,
    justify,
    align,
    border,
    grow = false,
    shrink = true,
    breakout = false,
    richTextStyles = false,
    classes
  } = newArgs

  /* Container, background and border check */

  const hasContainer = isStringStrict(maxWidth)
  const hasBackground = isStringStrict(background)
  const hasBorder = isStringStrict(border)

  /* Classes */

  const classesArr: string[] = []
  const layoutClassesArr: string[] = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    classesArr.push('ls-none')
    newArgs.attr = 'role="list"'
  }

  /* Background */

  if (hasBackground) {
    classesArr.push(`bg-${background}`)
  }

  /* Nest */

  if ((hasBackground && hasContainer) || (hasBorder && hasContainer)) {
    newArgs.nest = true
  }

  /* Breakout */

  if (breakout) {
    classesArr.push('breakout')
  }

  /* Border */

  if (hasBorder) {
    classesArr.push(`b-all b-theme ${border === 'full' ? 'b-radius-full' : 'b-radius-s b-radius-m-m'} overflow-hidden l-isolate`)
  }

  /* Layout */

  if (layout === 'col') {
    layoutClassesArr.push('flex col')
  }

  if (layout === 'col-s') {
    layoutClassesArr.push('flex wrap col-s')
  }

  if (layout === 'col-m') {
    layoutClassesArr.push('flex wrap col-m')
  }

  if (layout === 'col-l') {
    layoutClassesArr.push('flex wrap col-l')
  }

  if (layout === 'row') {
    layoutClassesArr.push('flex wrap')
  }

  if (layout === 'row-s') {
    layoutClassesArr.push('flex col row-s')
  }

  if (layout === 'row-m') {
    layoutClassesArr.push('flex col row-m')
  }

  if (layout === 'row-l') {
    layoutClassesArr.push('flex col row-l')
  }

  /* Justify */

  if (isStringStrict(justify)) {
    layoutClassesArr.push(`justify-${justify}`)
  }

  /* Align */

  if (isStringStrict(align)) {
    layoutClassesArr.push(`align-${align}`)
  }

  /* Gap */

  if (isStringStrict(gap)) {
    layoutClassesArr.push(`gap-${gap}`)
  }

  if (isStringStrict(gapLarge) && gapLarge !== gap) {
    layoutClassesArr.push(`gap-${gapLarge}-l`)
  }

  /* Grow */

  if (grow) {
    classesArr.push('grow-1')
  }

  /* Shrink */

  if (!shrink) {
    classesArr.push('shrink-0')
  }

  /* Container */

  if (hasContainer) {
    (hasBackground ? layoutClassesArr : classesArr).push(
      `container${maxWidth !== 'default' ? `-${maxWidth}` : ''}`
    )
  }

  /* Padding */

  const hasPaddingTop = isStringStrict(paddingTop)
  const hasPaddingBottom = isStringStrict(paddingBottom)
  const hasPaddingLeft = isStringStrict(paddingLeft)
  const hasPaddingRight = isStringStrict(paddingRight)
  const hasPaddingTopLarge = isStringStrict(paddingTopLarge)
  const hasPaddingBottomLarge = isStringStrict(paddingBottomLarge)
  const hasPaddingLeftLarge = isStringStrict(paddingLeftLarge)
  const hasPaddingRightLarge = isStringStrict(paddingRightLarge)
  const hasPaddingY = hasPaddingTop && hasPaddingBottom && paddingTop === paddingBottom
  const hasPaddingX = hasPaddingLeft && hasPaddingRight && paddingLeft === paddingRight
  const hasPaddingLargeY = hasPaddingTopLarge && hasPaddingBottomLarge && paddingTopLarge === paddingBottomLarge
  const hasPaddingLargeX = hasPaddingLeftLarge && hasPaddingRightLarge && paddingLeftLarge === paddingRightLarge

  if (hasPaddingY) {
    classesArr.push(`py-${paddingTop}`)
  }

  if (hasPaddingLargeY) {
    classesArr.push(`py-${paddingTopLarge}-m`)
  }

  if (hasPaddingX) {
    classesArr.push(`px-${paddingLeft}`)
  }

  if (hasPaddingLargeX) {
    classesArr.push(`px-${paddingLeftLarge}-m`)
  }

  if (hasPaddingTop && !hasPaddingY) {
    classesArr.push(`pt-${paddingTop}`)
  }

  if (hasPaddingTopLarge && !hasPaddingLargeY) {
    classesArr.push(`pt-${paddingTopLarge}-m`)
  }

  if (hasPaddingBottom && !hasPaddingY) {
    classesArr.push(`pb-${paddingBottom}`)
  }

  if (hasPaddingBottomLarge && !hasPaddingLargeY) {
    classesArr.push(`pb-${paddingBottomLarge}-m`)
  }

  if (hasPaddingLeft && !hasPaddingX) {
    classesArr.push(`pl-${paddingLeft}`)
  }

  if (hasPaddingLeftLarge && !hasPaddingLargeX) {
    classesArr.push(`pl-${paddingLeftLarge}-m`)
  }

  if (hasPaddingRight && !hasPaddingX) {
    classesArr.push(`pr-${paddingRight}`)
  }

  if (hasPaddingRightLarge && !hasPaddingLargeX) {
    classesArr.push(`pr-${paddingRightLarge}-m`)
  }

  /* Rich text styles */

  if (richTextStyles) {
    classesArr.push('rich-text e-line-up')
  }

  if (tag === 'figcaption') {
    classesArr.push('container-xs pt-m pt-l-m pb-m text-s text-center')
  }

  /* Classes */

  if (isStringStrict(classes)) {
    classesArr.push(classes)
  }

  newArgs.classes = classesArr.join(' ')
  newArgs.layoutClasses = layoutClassesArr.join(' ')

  /* Output */

  return {
    ...props,
    args: newArgs
  }
}

/* Exports */

export { Container }
