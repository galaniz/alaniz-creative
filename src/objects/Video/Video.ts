/**
 * Render - video
 */

/* Imports */

import playSvg from '../../svg/Play'
import pauseSvg from '../../svg/Pause'
import errorSvg from '../../svg/Error/Error'
import loader from '../Loader/Loader'

/**
 * Function - output video
 *
 * @param {object} props
 * @param {object} props.args
 * @prop {string} props.args.source
 * @prop {string} props.args.title
 * @return {string} HTML - figure
 */

interface Props {
  args: {
    source?: string
    title?: string
  }
  parents?: object[]
}

const video = (props: Props = { args: {} }): string => {
  const { args = {} } = props

  const {
    source = '',
    title = ''
  } = args

  /* Source and title required */

  if (source === '' || title === '') {
    return ''
  }

  /* Url */

  const url = `/assets/video/${source}`

  /* Output */

  return `
    <figure class="o-video" role="group" data-state="play" data-src="${url}">
      <div class="o-video__bg ar-16-9 relative overflow-hidden b-all b-radius-s b-radius-m-m l-isolate">
        <video playsinline muted class="block absolute top-0 left-0 w-full h-full object-cover">
          <source src="" type="video/mp4">
          <p>Your browser doesn't support HTML video. <a href="${url}" data-rich>${title}</a>.</p>
        </video>
        ${loader({ classes: 'o-video__loader' })}
        <button type="button" aria-label="Play ${title}" class="o-video__play none absolute center e-scale">
          <span class="b-radius-full b-all block ar-1-1 e-transition" data-scale>
            ${playSvg('absolute center w-2-5')}
          </span>
        </button>
        <button type="button" aria-label="Pause ${title}" class="o-video__pause none absolute right-0 bottom-0 w-l h-l b-radius-full b-all t-background-light">
          <span class="block ar-1-1"></span>
          ${pauseSvg('absolute center w-2-5 t-background-light')}
        </button>
      </div>
      <div class="o-video__error pt-xs none outline-none" tabindex="-1">
        <div class="info-negative pt-3xs pb-3xs pl-3xs pr-3xs b-radius-s">
          <div class="flex gap-4xs">
            ${errorSvg('w-xs h-s shrink-0')}
            <p class="text-s lead-open m-0 e-line-in">Sorry, there is a problem with the service. <a href="${url}" data-rich>${title} video</a>.</p>
          </div>
        </div>
      </div>
    </figure>
  `
}

/* Exports */

export default video
