/**
 * Objects - Button
 */

/* Imports */

import type { ButtonProps } from './ButtonTypes.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { ExternalSvg } from '../../svg/External/External.js'
import { ArrowSvg } from '../../svg/Arrow/Arrow.js'

/**
 * Output link button.
 *
 * @param {ButtonProps} props
 * @return {string} HTMLAnchorElement|HTMLDivElement
 */
const Button = (props: ButtonProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    title,
    internalLink,
    externalLink,
    type = 'primary',
    size = 'medium',
    richText = false,
    justify,
    paddingTop,
    paddingBottom,
    icon
  } = args

  let { link } = args

  /* Link and title required */

  if (!link) {
    link = getLink(internalLink, externalLink)
  }

  if (!isStringStrict(link) || !isStringStrict(title)) {
    return ''
  }

  /* External */

  const external = isStringStrict(externalLink)

  /* Classes */

  let linkClasses =
    `button ${type === 'primary' ? 'button-primary' : 'button-secondary b-all'} b-radius-l e-trans e-quad`

  if (size === 'l') {
    linkClasses += ' button-l'
  }

  /* Icon */

  let iconBefore = ''
  let iconAfter = ''

  if (icon === 'arrow') {
    iconBefore = ArrowSvg({
      width: 'xs',
      height: 'xs',
      classes: 'mr-4xs'
    })
  }

  if (icon === 'external' && external) {
    iconAfter = ExternalSvg({
      width: 'xs',
      height: 'xs',
      classes: 'ml-4xs'
    })
  }

  /* Output */

  let output = `
    <a class="${linkClasses}" href="${link}">
      ${iconBefore}
      ${title}
      ${iconAfter}
    </a>
  `

  if (richText) {
    output = `<div>${output}</div>`
  }

  const classes: string[] = []

  if (isStringStrict(paddingTop)) {
    classes.push(`pt-${paddingTop}`)
  }

  if (isStringStrict(paddingBottom)) {
    classes.push(`pt-${paddingBottom}`)
  }

  if (isStringStrict(justify)) {
    classes.push(`flex justify-${justify}`)
  }

  if (classes.length) {
    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export { Button }
