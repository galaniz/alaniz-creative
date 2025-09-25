/**
 * Components - Taxonomy
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { getArchiveLink } from '@alanizcreative/formation-static/utils/archive/archive.js'

/**
 * Taxonomy page template.
 *
 * @param {Item} itemData
 * @return {Item}
 */
const Taxonomy = (itemData: Item): Item => {
  /* Archive link */

  const {
    title: archiveTitle,
    link: archiveLink
  } = getArchiveLink('taxonomy', itemData)

  /* Output */

  return {
    ...itemData,
    hero: {
      type: 'minimal'
    },
    content: [
      {
        renderType: 'container',
        tag: 'section',
        paddingTop: 'l',
        paddingTopLarge: 'xl',
        paddingBottom: 'm',
        paddingBottomLarge: 'l',
        maxWidth: 's',
        content: [
          {
            renderType: 'posts',
            display: -1,
            headingLevel: 2,
            layout: 'text'
          },
          {
            renderType: 'container',
            paddingTop: 'l',
            paddingTopLarge: 'xl',
            content: [
              {
                renderType: 'button',
                type: 'secondary',
                title: `All ${archiveTitle.toLowerCase()}`,
                icon: 'arrow',
                link: archiveLink
              }
            ]
          }
        ]
      }
    ]
  }
}

/* Exports */

export { Taxonomy }
