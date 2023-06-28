/**
 * Render - single content
 */

/* Imports */

import { getArchiveLink } from '../../utils'
import { card } from '../cards'
import container from '../container'
import richText from '../rich-text'
import button from '../button'
import waveSeparator from '../wave-separator'

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
        classes: 'l-breakout'
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
