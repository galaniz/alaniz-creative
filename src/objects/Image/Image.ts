/**
 * Objects - Image
 */

/* Imports */

import type { ImageProps } from './ImageTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getImage, getImageMaxWidth } from '@alanizcreative/formation-static/utils/image/image.js'
import { RichText } from '@alanizcreative/formation-static/text/RichText/RichText.js'
import {
  configBreakpointNumbers,
  configColumnFloats,
  configContainerNumbers
} from '../../config/configOptions.js'

/**
 * Output image.
 *
 * @param {ImageProps} props
 * @return {string} HTMLDivElement|HTMLElement
 */
const Image = (props: ImageProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    image,
    alt,
    aspectRatio,
    maxWidth,
    caption,
    lazy = true,
    border = false,
    borderRadius = 'rounded',
    width,
    widthLarge,
    contain = false,
    align,
    classes
  } = args

  /* Card parent */

  const isCard = parents?.[0]?.renderType === 'card'

  /* Aspect ratio */

  const hasAspectRatio = isStringStrict(aspectRatio)

  /* Classes */

  const imageClasses = [
    'absolute top-0 left-0 w-full h-full',
    contain ? 'object-contain' : 'object-cover'
  ]

  if (isCard) {
    imageClasses.push('e-trans object-left-top')
  }

  let containerClasses = `relative overflow-hidden h-full ar-${hasAspectRatio ? aspectRatio : '1-1'}`

  if (borderRadius === 'rounded') {
    containerClasses += ' b-radius-s b-radius-m-m isolate'
  }

  if (borderRadius === 'full') {
    containerClasses += ' b-radius-full isolate'
  }

  if (border) {
    containerClasses += ' b-all b-theme'
  }

  if (isStringStrict(width)) {
    containerClasses += ` w-${width}`
  }

  if (isStringStrict(widthLarge)) {
    containerClasses += ` w-${widthLarge}-m`
  }

  if (align === 'center') {
    containerClasses += ' m-auto'
  }

  if (isStringStrict(classes)) {
    containerClasses += ` ${classes}`
  }

  /* Max width */

  let maxWidthNum = maxWidth

  if (parents && !maxWidth) {
    maxWidthNum = getImageMaxWidth({
      parents,
      source: 'remote',
      widths: configColumnFloats,
      maxWidths: configContainerNumbers,
      breakpoints: configBreakpointNumbers
    })
  }

  if (!maxWidthNum) {
    maxWidthNum = 1600
  }

  /* Details */

  const imageDetails = getImage({
    data: {
      ...image,
      url: `https://alanizcreative.com/assets/${image?.path}`
    },
    classes: imageClasses.join(' '),
    maxWidth: maxWidthNum,
    source: 'remote',
    lazy,
    alt
  }, true)

  const imageOutput = imageDetails.output
  const imageAspectRatio = imageDetails.aspectRatio

  if (!imageOutput) {
    return ''
  }

  /* Output */

  const containerAttr = 
    imageAspectRatio && !hasAspectRatio ? ` style="--aspect-ratio-padding:${imageAspectRatio * 100}%"` : ''

  let output = /* html */`
    <div class="${containerClasses}"${containerAttr}>
      ${imageOutput}
    </div>
  `

  if (isCard) {
    output = /* html */ `
      <div class="card-media order-first z-index--1 w-full">
        ${output}
      </div>
    `
  }

  /* Caption */

  const captionOutput = RichText({
    args: {
      tag: 'figcaption',
      content: caption,
      textStyle: 'text-xs',
      dataAttr: true,
      classes: 'pt-m pt-l-m'
    }
  })

  if (isStringStrict(captionOutput)) {
    output = /* html */`
      <figure>
        ${output}
        ${captionOutput}
      </figure>
    `
  }

  return output
}

/* Exports */

export { Image }
