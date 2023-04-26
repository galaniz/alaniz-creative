/**
 * Render - button
 */

/* Imports */

const { getLink } = require('../utils')
const externalLinkSvg = require('./svg/external-link')

/**
 * Function - output link button
 *
 * @param {object} args {
 *  @prop {string} title
 *  @prop {string} link
 *  @prop {object|boolean} internalLink
 *  @prop {string} externalLink
 *  @prop {string} type
 *  @prop {string} size
 *  @prop {string} justify
 *  @prop {string} paddingTop
 *  @prop {string} paddingBottom
 * }
 * @return {string} HTML - a || div
 */

const button = ({ args = {} }) => {
  const {
    title = '',
    internalLink = false,
    externalLink = '',
    type = 'main',
    size = '',
    justify = '',
    richText = false,
    paddingTop = '',
    paddingBottom = ''
  } = args

  let { link = '' } = args // Back end option

  /* Link and title required */

  link = link || getLink(internalLink, externalLink)

  if (!link || !title) {
    return ''
  }

  /* Check if external */

  const external = externalLink || false

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

  /* Output */

  let output = `
    <a class="${linkClasses}" href="${link}">
      ${title}
      ${external ? externalLinkSvg('l-width-xs l-height-xs') : ''}
    </a>
  `

  if (richText) {
    output = `<div data-button>${output}</div>`
  }

  if (justify || paddingTop || paddingBottom) {
    const classes = []

    if (paddingTop) {
      classes.push(`l-padding-top-${paddingTop}`)
    }

    if (paddingBottom) {
      classes.push(`l-padding-top-${paddingBottom}`)
    }

    if (justify) {
      classes.push(`l-flex l-justify-${justify}`)
    }

    output = `<div class="${classes.join(' ')}">${output}</div>`
  }

  return output
}

/* Exports */

module.exports = button
