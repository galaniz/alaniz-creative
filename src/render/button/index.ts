/**
 * Render - button
 */

/* Imports */

import { getLink } from '../../utils'
import externalLinkSvg from '../svg/external-link'
import arrowBackSvg from '../svg/arrow-back'

/**
 * Function - output link button
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.title
 * @param {string} props.args.link // Back end option
 * @param {object|boolean} props.args.internalLink
 * @param {string} props.args.externalLink
 * @param {string} props.args.link
 * @param {string} props.args.type
 * @param {string} props.args.size
 * @param {string} props.args.justify
 * @param {string} props.args.paddingTop
 * @param {string} props.args.paddingBottom
 * @param {string} props.args.richText
 * @param {boolean} props.args.newTab
 * @param {string} props.args.iconBefore
 * @return {string} HTML - a || div
 */

interface Props {
  args: {
    title?: string
    internalLink?: Render.InternalLink
    externalLink?: string
    link?: string
    type?: string
    size?: string
    justify?: string
    richText?: boolean
    paddingTop?: string
    paddingBottom?: string
    newTab?: boolean
    iconBefore?: string
  }
  parents?: object[]
}

const button = (props: Props = { args: {} }): string => {
  const { args = {} } = props

  const {
    title = '',
    internalLink,
    externalLink = '',
    type = 'main',
    size = '',
    justify = '',
    richText = false,
    paddingTop = '',
    paddingBottom = '',
    newTab = false,
    iconBefore = ''
  } = args

  let { link = '' } = args

  /* Link and title required */

  if (link === '') {
    link = getLink(internalLink, externalLink)
  }

  if (link === '' || title === '') {
    return ''
  }

  /* Check if external */

  const external = (externalLink !== '' && newTab) || false

  /* Classes */

  let linkClasses = 'o-button b-radius-l e-transition-quad'

  if (type === 'main') {
    linkClasses += ' o-button-main'
  } else if (type === 'secondary') {
    linkClasses += ' o-button-secondary b-all'
  }

  if (size === 'large') {
    linkClasses += ' o-button-large'
  }

  if (!external) {
    linkClasses += ' js-pt-link'
  }

  /* Icon before title */

  let iconBeforeOutput = ''

  if (iconBefore === 'arrow') {
    iconBeforeOutput = arrowBackSvg('l-width-xs l-height-xs')
  }

  /* Icon after title */

  let iconAfterOutput = ''

  if (external) {
    iconAfterOutput = externalLinkSvg('l-width-xs l-height-xs')
  }

  /* Icon attribute */

  let iconAttr = ''

  if (iconBeforeOutput !== '' || iconAfterOutput !== '') {
    iconAttr = ` data-icon="${iconBeforeOutput !== '' ? 'before' : 'after'}"`
  }

  /* Output */

  let output = `
    <a class="${linkClasses}" href="${link}"${newTab ? ' target="_blank" rel="noreferrer"' : ''}${iconAttr}>
      ${iconBeforeOutput}
      ${title}
      ${iconAfterOutput}
    </a>
  `

  if (richText) {
    output = `<div data-button>${output}</div>`
  }

  if (justify !== '' || paddingTop !== '' || paddingBottom !== '') {
    const classes: string[] = []

    if (paddingTop !== '') {
      classes.push(`l-padding-top-${paddingTop}`)
    }

    if (paddingBottom !== '') {
      classes.push(`l-padding-top-${paddingBottom}`)
    }

    if (justify !== '') {
      classes.push(`l-flex l-justify-${justify}`)
    }

    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

export default button
