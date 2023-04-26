/**
 * Render - image
 */

/* Imports */

const { getImage } = require('../utils')
const richText = require('./rich-text')

/**
 * Function - output image
 *
 * @param {object} args {
 *  @prop {object} image
 *  @prop {string} aspectRatio
 *  @prop {object} caption
 *  @prop {boolean} border
 * }
 * @param {array<object>} parents
 * @return {string} HTML - div
 */

const image = ({ args = {}, parents = [] }) => {
  const {
    image = {},
    alt = "",
    aspectRatio = '',
    caption = {},
    border = false
  } = args

  /* Check card parent */

  let card = false

  if (parents.length) {
    if (parents[0].type === 'card') {
      card = true
    }
  }

  /* Image */

  let imageOutput = ''

  if (image) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover']

    if (card) {
      imageClasses.push('e-transition l-object-left-top')
    }

    imageOutput = getImage({
      data: {...image, alt},
      classes: imageClasses.join(' '),
      attr: card ? 'data-scale' : '',
      returnAspectRatio: true,
      max: card ? 800 : 2000
    })

    let classes = 'l-relative l-overflow-hidden b-radius-s b-radius-m-m l-isolate l-height-100-pc'

    if (aspectRatio) {
      classes += ` l-aspect-ratio-${aspectRatio}`
    }

    if (card) {
      classes += ' l-after bg-gradient-0'
    }

    if (border) {
      classes += ' b-all b-theme'
    }

    imageOutput = `
      <div class="${classes}"${!aspectRatio ? ` style="padding-top:${imageOutput.aspectRatio * 100}%"` : ''}>
        ${imageOutput.output}
      </div>
    `
  }

  /* Card wrapper */

  if (imageOutput && card) {
    imageOutput = `
      <div class="l-relative l-z-index--1 l-overflow-hidden l-after bg-overlay l-order-first" data-overlay>
        ${imageOutput}
      </div>
    `
  }

  /* Figure caption */

  const { content } = caption

  if (content) {
    const captionContent = richText({
      tag: 'p',
      content: content[0].content,
      textStyle: 'xs',
      classes: 'l-padding-top-m l-padding-top-l-m'
    })

    if (captionContent) {
      imageOutput = `
        <figure>
          ${imageOutput}
          <figcaption data-inline>${captionContent}</figcaption>
        </figure>
      `
    }
  }

  /* Output */

  return imageOutput
}

/* Exports */

module.exports = image
