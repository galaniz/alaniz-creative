/**
 * Render - hero
 */

/* Imports */

import { getImage } from '../../utils'
import { enumWaves, enumBlobs } from '../../vars/enums'
import button from '../../objects/Button/Button'

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

const hero = (args: Render.HeroArgs = {}): string => {
  const {
    
  } = args

  

  /* Blob */

  let blobOutput = ''

  if (blob !== undefined) {
    const path: string = enumBlobs[blob].path

    blobOutput = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 75"
        class="hero-blob absolute"
      >
        <path
          d="${path}"
          fill="none"
          stroke="var(--sharp-color)"
          stroke-opacity="0.5"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `
  }

  /* Text */

  let headingClasses = ''
  let textClasses = 'text-l e-line-in'

  if (contentType === 'work') {
    headingClasses = 't-align-center'

    if (imageOutput !== '') {
      headingClasses += ' pb-m pb-l-m'
    }
  }

  if (contentType === 'page' && action !== undefined && text === '') {
    headingClasses = 'pb-m pb-l-m'
  }

  if (contentType === 'page' && action === undefined && text !== '') {
    headingClasses = 'pb-xs pb-m-m'
  }

  let textOutput = `<h1${headingClasses !== '' ? ` class="${headingClasses}"` : ''}>${title}</h1>`

  if (text !== '') {
    if (action !== undefined) {
      textClasses += ' pb-m pb-l-m'
    }

    textOutput += `<p class="${textClasses}">${text}</p>`
  }

  if (action !== undefined) {
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
    sectionClasses = 'overflow-hidden ptext-l pt-xl-m'
    container = 'xs'
    output = textOutput + imageOutput
  } else {
    output = blobOutput + textOutput

    if (type === 'minimal') {
      sectionClasses = 'container-xs relative ptext-l pt-2xl-m pb-m pb-l-m'
    }

    if (type === 'profile') {
      output = imageOutput + output
      sectionClasses = 'container-xs relative pt-m pt-l-m pb-m pb-l-m t-align-center'
    }

    if (type === 'index') {
      sectionClasses = 'container relative pt-xl pb-2xl pt-3xl-m pb-4xl-m'
    }

    if (archive === 'work' || archive === 'workCategory' || contentType === 'workCategory') {
      sectionClasses = 'container ptext-l pt-2xl-m'
    }
  }

  return `
    <section class="${sectionClasses}">
      ${container !== '' ? `<div class="container-${container}">` : ''}
      ${output}
      ${container !== '' ? '</div>' : ''}
    </section>
  `
}

/* Exports */

export default hero
