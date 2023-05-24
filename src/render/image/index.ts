/**
 * Render - image
 */

/* Imports */

import { getImage } from '../../utils'
import richText from '../rich-text'

/**
 * Function - output image
 *
 * @param {object} props
 * @param {object} props.args
 * @param {object} props.args.image
 * @param {string} props.args.aspectRatio
 * @param {object} props.args.caption
 * @param {boolean} props.args.border
 * @param {array<object>} props.parents
 * @return {string} HTML - div
 */

interface Props {
  args: {
    image?: Render.Image
    alt?: string
    aspectRatio?: string
    caption?: {
      content: string
    }
    border?: boolean
  }
  parents?: Array<{ renderType: string }>
}

const image = (props: Props = { args: {}, parents: [] }): string => {
  const { args = {}, parents = [] } = props

  const {
    image,
    alt = '',
    aspectRatio = '',
    caption,
    border = false
  } = args

  /* Check card parent */

  let card = false

  if (parents.length > 0) {
    if (parents[0]?.renderType === 'card') {
      card = true
    }
  }

  /* Image */

  let imageOutput = ''

  if (image !== undefined) {
    const imageClasses = ['l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover']

    if (card) {
      imageClasses.push('e-transition l-object-left-top')
    }

    const { base, width, height } = image

    const imageObj = getImage({
      data: {
        base,
        width,
        height,
        alt
      },
      classes: imageClasses.join(' '),
      attr: card ? 'data-scale' : '',
      returnAspectRatio: true,
      max: card ? 1600 : 2000
    })

    let imageObjAspectRatio = 0
    let imageObjOutput = ''

    if (typeof imageObj === 'string') {
      imageObjOutput = imageObj
    } else {
      imageObjAspectRatio = imageObj.aspectRatio
      imageObjOutput = imageObj.output
    }

    let classes = 'l-relative l-overflow-hidden b-radius-s b-radius-m-m l-isolate l-height-100-pc'

    if (aspectRatio !== '') {
      classes += ` l-aspect-ratio-${aspectRatio}`
    }

    if (border) {
      classes += ' b-all b-theme'
    }

    let attr = ''

    if (aspectRatio === '' && imageObjAspectRatio !== 0) {
      attr += ` style="padding-top:${imageObjAspectRatio * 100}%"`
    }

    if (imageObjOutput !== '') {
      imageOutput = `
        <div class="${classes}"${attr}>
          ${imageObjOutput}
        </div>
      `
    }
  }

  /* Card wrapper */

  if (imageOutput !== '' && card) {
    imageOutput = `
      <div class="l-order-first l-z-index--1 l-width-1-1" data-image>
        ${imageOutput}
      </div>
    `
  }

  /* Figure caption */

  if (caption !== undefined) {
    const captionContent = richText({
      args: {
        tag: 'p',
        content: caption.content,
        textStyle: 'xs',
        classes: 'l-padding-top-m l-padding-top-l-m'
      }
    })

    if (captionContent !== '') {
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

export default image
