/**
 * Render - video
 */

/* Imports */

import playSvg from '../svg/play'
import pauseSvg from '../svg/pause'
import errorSvg from '../svg/error'
import loader from '../loader'

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
    source?: string;
    title?: string;
  },
  parents?: object[];
}

const video = (props : Props = { args: {} }): string => {
  const { args = {} } = props

  const {
    source = '',
    title = ''
  } = args

  /* Source and title required */

  if (!source || !title) {
    return ''
  }

  /* Url */

  const url = `/assets/video/${source}`

  /* Output */

  return `
    <figure class="o-video" role="group" data-state="play" data-src="${url}">
      <div class="o-video__bg l-aspect-ratio-57 l-relative l-overflow-hidden b-all b-radius-s b-radius-m-m l-isolate">
        <video playsinline muted class="l-block l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc l-object-cover">
          <source src="" type="video/mp4">
          <p>Your browser doesn't support HTML video. <a href="${url}" data-inline>${title}</a>.</p>
        </video>
        ${loader({ classes: 'o-video__loader' })}
        <button type="button" aria-label="Play ${title}" class="o-video__play l-none l-absolute l-center e-scale">
          <span class="b-radius-100-pc b-all l-block l-aspect-ratio-100 e-transition" data-scale>
            ${playSvg('l-absolute l-center l-width-2-5')}
          </span>
        </button>
        <button type="button" aria-label="Pause ${title}" class="o-video__pause l-none l-absolute l-right-0 l-bottom-0 l-width-l l-height-l b-radius-100-pc b-all t-background-light">
          <span class="l-block l-aspect-ratio-100"></span>
          ${pauseSvg('l-absolute l-center l-width-2-5 t-background-light')}
        </button>
      </div>
      <div class="o-video__error l-padding-top-xs l-none" tabindex="-1">
        <div class="o-info-negative l-padding-top-3xs l-padding-bottom-3xs l-padding-left-3xs l-padding-right-3xs b-radius-s">
          <div class="l-flex l-gap-margin-3xs">
            <div class="l-flex-shrink-0">
              ${errorSvg('l-width-xs l-height-xs')}
            </div>
            <div>
              <p class="t-s t-line-height-150-pc l-margin-0 e-underline">Sorry, there is a problem with the service. <a href="${url}" data-inline>${title}</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  `
}

/* Exports */

export default video
