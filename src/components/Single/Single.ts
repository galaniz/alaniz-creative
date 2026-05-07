/**
 * Components - Single
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { getArchiveLink } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { Card, CardContainer } from '../../objects/Card/Card.js'
import { Button } from '../../objects/Button/Button.js'

/**
 * Output additional content for single posts.
 *
 * @param {string} content
 * @param {string} contentType
 * @param {Item} itemData
 * @return {string} HTMLElement
 */
const Single = (content: string, contentType: string, itemData: Item): string => {
  /* Related required */

  const { related } = itemData

  if (!isArrayStrict(related)) {
    return content
  }

  const relatedOutput = CardContainer(
    related.map(relatedItem => Card({
      args: {
        headingLevel: 3,
        internalLink: relatedItem
      },
      parents: [
        {
          renderType: 'container',
          args: {
            maxWidth: 's'
          }
        }
      ]
    })).join(''),
    'minimal',
    'pb-l pb-2xl-m'
  )

  /* Wave separator */

  const waveWidth = 102
  const waveHeight = 12

  /* Archive link */

  const {
    link: archiveLink,
    title: archiveTitle
  } = getArchiveLink(contentType, itemData)

  let archiveOutput = ''

  if (archiveLink && archiveTitle) {
    archiveOutput = Button({
      args: {
        title: `All ${archiveTitle.toLowerCase()}`,
        icon: 'arrow',
        type: 'secondary',
        justify: 'center',
        link: archiveLink
      }
    })
  }

  /* Output */

  return /* html */`
    ${content}
    <div class="breakout pt-xl pt-2xl-m pb-l">
      <div class="relative" style="max-height:var(--ac-4xl)">
        <div style="padding-top:${(waveHeight / waveWidth) * 100}%"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 ${waveWidth} ${waveHeight}"
          preserveAspectRatio="none"
          class="absolute top-0 left-0 w-full h-full"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <path
            d="m101.77,4.62c-18.28-9.87-34.42,1.06-47.08,2.43-22.54,2.44-23.62-4.33-36.08-4.33C7.81,2.72,1.75,8.12.48,11.82"
            fill="none"
            stroke="var(--ac-theme-color)"
            stroke-opacity="0.5"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
    <section class="container-s button-sharp">
      <div class="pb-m pb-l-m">
        <h2 class="heading-m">Explore more work</h2>
      </div>
      ${relatedOutput}
      ${archiveOutput}
    </section>
  `
}

/* Exports */

export { Single }
