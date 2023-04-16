/**
 * Render - hero
 */

/* Imports */

const { getImage } = require('../utils')
const button = require('./button')

/**
 * Function - output hero
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {string} type
 *  @prop {string} title
 *  @prop {string} text
 *  @prop {object} image
 *  @prop {object} callToAction
 * }
 * @return {string} HTML - section
 */

const hero = (args = {}) => {
  let {
    contentType = 'page',
    type = 'Minimal',
    title = '',
    text = '',
    image = {},
    callToAction
  } = args

  /* Image */

  let imageOutput = ''

  if (image?.fields) {
    imageOutput = getImage({
      data: image?.fields,
      classes: 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover',
      lazy: false,
      max: 800
    })
  }

  /* Call to Action */

  let callToActionOutput = ''

  if (callToAction) {
    callToActionOutput = button({
      args: {
        ...callToAction
      }
    })
  }

  /* Text */

  let textOutput = `<h1>${title}</h1>`

  if (text) {
    let textClasses = 't-l'

    if (callToActionOutput) {
      textClasses += ' l-padding-bottom-m'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`
  }

  /* Minimal */

  return ''
}

/* Exports */

module.exports = hero
