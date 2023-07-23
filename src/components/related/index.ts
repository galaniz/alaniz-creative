/**
 * Components - related
 */

/* Imports */

import getArchiveLink from '@alanizcreative/static-site-formation/lib/utils/get-archive-link'
import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import richText from '@alanizcreative/static-site-formation/lib/text/rich-text'
import { card } from '../../objects/cards'
import button from '../../objects/button'
import wave from '../wave'

/**
 * Function - output related cards in single post
 *
 * @param {object} args
 * @param {string} args.contentType
 * @param {array<object>} args.posts
 * @return {string} HTML - html
 */

interface Args {
  contentType: string
  posts: AC.InternalLink[]
}

const related = ({ contentType = '', posts = [] }: Args): string => {
  /* All params required */

  if (contentType === '' || posts.length === 0) {
    return ''
  }

  /* Posts content */

  const cards = posts.map((r) => {
    const c = card({
      args: {
        headingLevel: 3,
        internalLink: r
      }
    })

    return c.start + c.end
  }).join('')

  if (cards === '') {
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
    ${wave()}
    ${containers.wave.end}
    ${containers.section.start}
      ${containers.title.start}
        ${content.title}
      ${containers.title.end}
      ${containers.cards.start}
        ${cards}
      ${containers.cards.end}
      ${content.button}
    ${containers.section.end}
  `
}

/* Exports */

export default related
