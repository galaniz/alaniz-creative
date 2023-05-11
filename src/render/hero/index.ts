/**
 * Render - hero
 */

/* Imports */

import { getImage } from '../../utils'
import button from '../button'

/**
 * Function - output hero
 *
 * @param {object} args
 * @prop {string} args.contentType
 * @prop {string} args.archive
 * @prop {string} args.type // index || profile || minimal
 * @prop {string} args.title
 * @prop {string} args.text
 * @prop {object} args.image
 * @prop {object} args.wave
 * @prop {object} args.blob
 * @prop {boolean} args.border
 * @prop {object} args.action
 * @return {string} HTML - section
 */

const hero = (args: Render.HeroArgs = {}) => {
  const {
    contentType = 'page',
    archive = '',
    type = 'minimal',
    title = '',
    text = '',
    image,
    wave,
    blob,
    border = false,
    action = false
  } = args

  /* Image */

  let imageOutput = ''

  if (image) {
    const imageStr = getImage({
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 ${wave.width} ${wave.height}"
              preserveAspectRatio="none"
              class="l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path
                d="${wave.path}"
                fill="none"
                stroke="var(--theme-main)"
                stroke-opacity="0.5"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
            </svg>
          </div>
        `
      }

      imageOutput = `
        <div class="l-relative">
          ${waveOutput}
          <div class="l-aspect-ratio-62 l-relative l-overflow-hidden b-radius-s b-radius-m-m l-isolate${border ? ' b-all b-theme' : ''}">
            ${imageStr}
          </div>
        </div>
      `
    }
  }

  /* Blob */

  let blobOutput = ''

  if (blob) {
    blobOutput = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 75"
        class="c-blob l-absolute"
      >
        <path
          d="${blob.path}"
          fill="none"
          stroke="var(--heading-color)"
          stroke-opacity="0.5"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `
  }

  /* Text */

  let headingClasses = ''
  let textClasses = 't-l'

  if (contentType === 'work') {
    headingClasses = 't-align-center'

    if (imageOutput) {
      headingClasses += ' l-padding-bottom-m l-padding-bottom-l-m'
    }
  }

  if (contentType === 'page' && action && !text) {
    headingClasses = 'l-padding-bottom-m l-padding-bottom-l-m'
  }

  if (contentType === 'page' && !action && text) {
    headingClasses = 'l-padding-bottom-xs l-padding-bottom-m-m'
  }

  let textOutput = `<h1${headingClasses ? ` class="${headingClasses}"` : ''}>${title}</h1>`

  if (text) {
    if (action) {
      textClasses += ' l-padding-bottom-m l-padding-bottom-l-m'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`
  }

  if (action) {
    textOutput += button({
      args: {
        title: action.text,
        internalLink: action.internalLink,
        size: 'large'
      }
    })
  }

  /* Output */

  let sectionClasses = ''
  let container = ''
  let output = ''

  if (contentType === 'work') {
    sectionClasses = 'l-overflow-hidden l-padding-top-l l-padding-top-xl-m'
    container = 'xs'
    output = textOutput + imageOutput
  } else {
    output = blobOutput + textOutput

    if (type === 'minimal') {
      sectionClasses = 'l-container-xs l-relative l-padding-top-l l-padding-top-2xl-m l-padding-bottom-m l-padding-bottom-l-m'
    }

    if (type === 'profile') {
      sectionClasses = 'l-container-xs l-relative l-padding-top-m l-padding-top-l-m l-padding-bottom-m l-padding-bottom-l-m t-align-center'
    }

    if (type === 'index') {
      sectionClasses = 'l-container l-relative l-padding-top-xl l-padding-bottom-2xl l-padding-top-3xl-m l-padding-bottom-4xl-m'
    }

    if (archive === 'work') {
      sectionClasses = 'l-container l-padding-top-l l-padding-top-2xl-m'
    }
  }

  return `
    <section class="${sectionClasses}">
      ${container ? `<div class="l-container-${container}">` : ''}
      ${output}
      ${container ? '</div>' : ''}
    </section>
  `
}

/* Exports */

export default hero
