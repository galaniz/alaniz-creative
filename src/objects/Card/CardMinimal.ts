/**
 * Objects - Card Minimal
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'

/**
 * Output minimal card item.
 *
 * @param {Item} internalLink
 * @param {string} [text]
 * @return {string} HTMLLIElement
 */
const CardMinimal = (internalLink: Item, text?: string): string => {
  /* Internal link required */

  if (!isObjectStrict(internalLink)) {
    return ''
  }

  const { title, contentType } = internalLink
  const link = getLink(internalLink)

  /* Title, link and content type  required */

  if (!isStringStrict(title) || !isStringStrict(link) || !isStringStrict(contentType)) {
    return ''
  }

  /* Text */

  let textOutput = ''

  if (isStringStrict(text)) {
    textOutput = `<p class="text-s pt-2xs" data-rich>${text}</p>`
  }

  /* Output */

  return /* html */`
    <li>
      <h2 class="inline-block relative">
        <a href="${link}" class="before outline-tight" data-rich>${title}</a>
      </h2>
      ${textOutput}
    </li>
  `
}

/**
 * Output minimal list container.
 *
 * @param {string} output
 * @return {string} HTMLUListElement
 */
const CardMinimalContainer = (output: string): string => {
  return /* html */`
    <ul class="ls-none e-line-up flex col gap-m gap-l-l" role="list">
      ${output}
    </ul>
  `
}

/* Exports */

export {
  CardMinimal,
  CardMinimalContainer
}
