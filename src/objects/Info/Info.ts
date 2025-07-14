/**
 * Objects - Info
 */

/* Imports */

import { InfoSvg } from '../../svg/Info/Info.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

/**
 * Output info message.
 *
 * @param {string} text
 * @return {string} HTMLDivElement
 */
const Info = (text: string): string => {
  /* Text required */

  if (!isStringStrict(text)) {
    return ''
  }

  /* Output */

  return /* html */`
    <div class="info-neutral flex gap-3xs px-xs py-xs b-radius-s">
      ${InfoSvg({
        width: 's',
        height: 's',
        classes: 'w-m-m h-m-m'
      })}
      <p class="text-m lead-open wt-medium m-0">${text}</p>
    </div>
  `
}

/* Exports */

export { Info }
