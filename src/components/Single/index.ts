/**
 * Render - single content
 */

/* Imports */

import { getArchiveLink } from '../../utils'
import { card } from '../cards'
import container from '../container'
import richText from '../rich-text'
import button from '../../objects/Button/Button'


/**
 * Render - wave separator
 */

/**
 * Function - output wave separator
 *
 * @return {string} HTML - div
 */

const waveSeparator = (): string => {
  const width = 102
  const height = 12

  /* Output */

  return `
    <div class="relative l-max-height-4xl">
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
          d="m101.77,4.62c-18.28-9.87-34.42,1.06-47.08,2.43-22.54,2.44-23.62-4.33-36.08-4.33C7.81,2.72,1.75,8.12.48,11.82"
          fill="none"
          stroke="var(--theme-primary)"
          stroke-opacity="0.5"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  `
}

/* Exports */

export default waveSeparator


/**
 * Function - output additional content for single posts
 *
 * @param {object} args
 * @param {string} args.contentType
 * @param {array<object>} args.related
 * @return {string} HTML - html
 */

interface Args {
  contentType: string
  related: Render.InternalLink[]
}

const singleContent = ({ contentType = 'work', related = [] }: Args): string => {
  /* Related required */

  if (related.length === 0) {
    return ''
  }

  /* Related content */

  const relatedCards = related.map((r) => {
    const c = card({
      args: {
        headingLevel: 3,
        internalLink: r
      }
    })

    return c.start + c.end
  }).join('')

  if (relatedCards === '') {
    return ''
  }

  /* Content output */

  const content = {
    title: richText({
      args: {
        headingStyle: 'h3',
        tag: 'h2',
        content: 'Explore more work'
      }
    }),
    button: ''
  }

  /* Archive title and link */

  const archiveData = getArchiveLink(contentType)

  if (archiveData.title !== '' && archiveData.link !== '') {
    content.button = button({
      args: {
        title: `All ${archiveData.title.toLowerCase()}`,
        iconBefore: 'arrow',
        type: 'secondary',
        justify: 'center',
        link: archiveData.link
      }
    })
  }

  /* Containing output */

  const containers = {
    wave: container({
      args: {
        paddingTop: 'xl',
        paddingTopLarge: '2xl',
        paddingBottom: 'l',
        classes: 'breakout'
      }
    }),
    section: container({
      args: {
        maxWidth: 's',
        tag: 'section'
      }
    }),
    title: container({
      args: {
        paddingBottom: 'm',
        paddingBottomLarge: 'l'
      }
    }),
    cards: container({
      args: {
        paddingBottom: 'l',
        paddingBottomLarge: '2xl',
        layout: 'row',
        gap: 'm',
        gapLarge: 'l',
        tag: 'ul'
      }
    })
  }

  /* Output */

  return `
    ${containers.wave.start}
    ${waveSeparator()}
    ${containers.wave.end}
    ${containers.section.start}
      ${containers.title.start}
        ${content.title}
      ${containers.title.end}
      ${containers.cards.start}
        ${relatedCards}
      ${containers.cards.end}
      ${content.button}
    ${containers.section.end}
  `
}

/* Exports */

export default singleContent
