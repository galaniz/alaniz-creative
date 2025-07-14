/**
 * Components - Hero
 */

/* Imports */

import type { HeroArgs, HeroWave, HeroWaveSvg } from './HeroTypes.js'
import type { ImageArgs } from '../../objects/Image/ImageTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { Image } from '../../objects/Image/Image.js'

/**
 * Wave svg details.
 *
 * @private
 * @type {Map<HeroWave, HeroWaveSvg>}
 */
const heroWaves: Map<HeroWave, HeroWaveSvg> = new Map([
  [
    'one', {
      path: 'm.33,7.11c2.46,2.08,5.29,3.77,8.48,4.97,20.45,7.71,36.26-5.21,49.49-8.12,23.54-5.17,25.75,3.14,38.63,0,2.9-.71,5.49-1.92,7.78-3.53',
      width: 105,
      height: 15
    }
  ],
  [
    'two', {
      path: 'm.34.39c5.6,4.98,12.55,7.39,19.64,5.4,27.44-7.73,33.19,18.71,61.75,18.71,6.91,0,12.53-2.2,16.93-5.9',
      width: 99,
      height: 25
    }
  ],
  [
    'three', {
      path: 'm.35.37c.09.07.17.15.26.22,18.48,15.51,22.12.04,42.95,12.05,17.05,9.84,27.13,8.38,37.67,0,.85-.68,1.66-1.39,2.42-2.13',
      width: 84,
      height: 20
    }
  ],
  [
    'four', {
      path: 'm.39.35c14.15,16.04,29.88,6.56,34.95,5.91,14.99-1.92,20.79,9.86,36.57,6.69,5.73-1.15,10.68-4.76,14.68-9.91',
      width: 87,
      height: 14
    }
  ],
  [
    'five', {
      path: 'm99.72,11.81c-2.06,1.3-4.22,2.07-6.48,2.43-15.81,2.54-36.07-14.88-56.49-7.63C20.74,12.3,8.56,8.52.37.36',
      width: 100,
      height: 15
    }
  ]
])

/**
 * Output hero section.
 *
 * @prop {HeroArgs} args
 * @return {string} HTMLSectionElement
 */
const Hero = (args: HeroArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    contentType = 'page',
    archive,
    type = 'media-text',
    title,
    text,
    image,
    wave,
    blob,
    border = false,
    action
  } = args

  /* Type */

  const isMediaText = type === 'media-text'
  const isMinimal = type === 'minimal'
  const isProfile = type === 'profile'
  const isWork = contentType === 'work'

  /* Image */

  let imageOutput = ''
  let hasImage = false

  if ((isMediaText || isProfile) && image) {
    const imageArgs: ImageArgs = {
      image,
      lazy: false,
      maxWidth: isProfile ? 600 : 1600,
      border
    }

    if (isProfile) {
      imageArgs.aspectRatio = '1-1'
      imageArgs.borderRadius = 'full'
    }

    if (isWork) {
      imageArgs.aspectRatio = '16-10'
      imageArgs.borderRadius = 'rounded'
      imageArgs.border = border
    }

    imageOutput = Image({
      args: imageArgs
    })

    hasImage = !!imageOutput
  }

  if (isProfile && hasImage) {
    imageOutput = /* html */`
      <div class="hero-profile pb-m pb-l-m col-5 m-auto">
        ${imageOutput}
      </div>
    `
  }

  if (isWork && hasImage && wave) {
    const waveSvg = heroWaves.get(wave)

    if (waveSvg) {
      const { width, height, path } = waveSvg

      imageOutput = /* html */`
        <div class="relative">
          <div class="hero-wave absolute w-full-vw center">
            <div style="padding-top:${(height / width) * 100}%"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 ${width} ${height}"
              preserveAspectRatio="none"
              class="absolute top-0 left-0 w-full h-full"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <path
                d="${path}"
                fill="none"
                stroke="var(--theme-primary)"
                stroke-opacity="0.5"
                stroke-width="1"
                vector-effect="non-scaling-stroke"
              />
            </svg>
          </div>
          ${imageOutput}
        </div>
      `
    }
  }
}

/* Exports */

export { Hero }
