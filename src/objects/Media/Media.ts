/**
 * Objects - Media
 */

/* Imports */

import type { MediaProps } from './MediaTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { Info } from '../Info/Info.js'
import { Loader } from '../Loader/Loader.js'
import { PlaySvg } from '../../svg/Play/Play.js'
import { PauseSvg } from '../../svg/Pause/Pause.js'

/**
 * Output media component.
 *
 * @param {MediaProps} props
 * @return {string} HTMLDivElement|HTMLElement
 */
const Media = (props: MediaProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const { source, title } = args

  /* Source and title required */

  if (!isStringStrict(source) || !isStringStrict(title)) {
    return ''
  }

  /* Loader */

  const loaderId = Loader()

  /* Error */

  const errorId = Info({
    title: 'Sorry, there is a problem with the service.',
    text: 'Try again later.',
    template: true,
    type: 'error'
  })

  /* Scripts and styles */

  addStyle('objects/Media/Media')
  addScript('objects/Media/MediaClient')

  /* Output */

  return /* html */`
    <ac-media
      class="media block ar-16-9 relative overflow-hidden b-all b-radius-s b-radius-m-m l-isolate"
      role="group"
      loader="${loaderId}"
      error="${errorId}"
      title="${title}"
      url="https://assets.alanizcreative.com/${source}"
      type="video"
    >
      <video playsinline muted class="block absolute top-0 left-0 w-full h-full object-cover"></video>
      <button
        type="button"
        aria-label="Play ${title}"
        class="media-play b-radius-full b-all absolute all-0 m-auto e-shift e-trans"
        data-media-control="play"
      >
        ${PlaySvg({ classes: 'media-icon absolute center' })}
      </button>
      <button
        type="button"
        aria-label="Pause ${title}"
        class="media-pause absolute right-0 bottom-0 w-l h-l b-radius-full b-all background-light"
        data-media-control="pause"
      >
        <span class="block ar-1-1"></span>
        ${PauseSvg({ classes: 'media-icon absolute center background-light' })}
      </button>
    </ac-media>
  `
}

/* Exports */

export { Media }
