/**
 * Render - hero
 */

/* Imports */

const { getImage } = require('../utils')

/**
 * Function - output hero
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {string} type
 *  @prop {string} title
 *  @prop {string} text
 *  @prop {object} image
 *  @prop {object} wave
 * }
 * @return {string} HTML - section
 */

const hero = (args = {}) => {
  let {
    contentType = 'page',
    type = '',
    title = '',
    text = '',
    image = {},
    wave = false
  } = args

  /* Image */

  let imageOutput = ''

  if (image) {
    imageOutput = getImage({
      data: image,
      classes: 'l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover',
      lazy: false,
      max: 1600
    })

    if (contentType === 'work') {
      let waveOutput = ''

      if (wave) {
        waveOutput = `
          <div class="l-absolute l-width-100-vw l-max-height-100-pc l-center">
            <div style="padding-top:${(wave.height / wave.width) * 100}%"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${wave.width} ${wave.height}" preserveAspectRatio="none" class="l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc">
              <path d="${wave.path}" fill="none" stroke="var(--theme-main)" stroke-opacity="0.5" stroke-width="1" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        `
      }

      imageOutput = `
        <div class="l-relative">
          ${waveOutput}
          <div class="l-aspect-ratio-62 l-relative l-overflow-hidden b-radius-s b-radius-m-m l-isolate">
            ${imageOutput}
          </div>
        </div>
      `
    }
  }

  /* Text */

  let textOutput = `<h1 class="t-align-center l-padding-bottom-m l-padding-bottom-l-m">${title}</h1>`

  if (text) {
    textOutput += `<p class="t-l">${text}</p>`
  }

  /* Output */

  let output = ''

  if (contentType === 'work') {
    output = `
      <section class="l-overflow-hidden l-padding-top-m l-padding-top-l-s">
        <div class="l-container-xs">
          ${textOutput}
          ${imageOutput}
        </div>
      </section>
    `
  }

  return output
}

/* Exports */

module.exports = hero
