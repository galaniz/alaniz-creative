/**
 * Objects - Video
 */

/* Imports */

import type { VideoProps } from './VideoTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { Info } from '../Info/Info.js'
import { Loader } from '../Loader/Loader.js'
import { PlaySvg } from '../../svg/Play/Play.js'
import { PauseSvg } from '../../svg/Pause/Pause.js'

/**
 * Output video component.
 *
 * @param {VideoProps} props
 * @return {string} HTMLDivElement|HTMLElement
 */
const Video = (props: VideoProps): string => {
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

  addStyle('objects/Video/Video')
  addScript('objects/Video/VideoClient')

  /* Output */

  return /* html */`
    <ac-video
      class="video"
      role="group"
      loader="${loaderId}"
      errorId="${errorId}"
      title="${title}"
      url="/assets/video/${source}"
    >
      <div class="video-bg ar-16-9 relative overflow-hidden b-all b-radius-s b-radius-m-m l-isolate">
        <video playsinline muted class="block absolute top-0 left-0 w-full h-full object-cover">
          <source src="" type="video/mp4">
        </video>
        <button type="button" aria-label="Play ${title}" class="video-play absolute center e-scale">
          <span class="video-play-bg b-radius-full b-all block ar-1-1 e-trans" data-scale>
            ${PlaySvg({ classes: 'video-icon absolute center w-2-5' })}
          </span>
        </button>
        <button type="button" aria-label="Pause ${title}" class="video-pause absolute right-0 bottom-0 w-l h-l b-radius-full b-all background-light">
          <span class="block ar-1-1"></span>
          ${PauseSvg({ classes: 'video-icon absolute center w-2-5 background-light' })}
        </button>
      </div>
    </ac-video>
  `
}

/* Exports */

export { Video }
