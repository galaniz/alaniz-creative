/**
 * Components - Term
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import { getArchiveLink } from '@alanizcreative/formation-static/utils/archive/archive.js'

/**
 * Term page template.
 *
 * @param {Item} itemData
 * @return {Item}
 */
const Term = (itemData: Item): Item => {
  /* Archive link */

  const {
    title: archiveTitle,
    link: archiveLink
  } = getArchiveLink('term', itemData)

  /* Output */

  return {
    ...itemData,
    content: [
      {
        renderType: 'container',
        tag: 'section',
        paddingBottom: 'xl',
        paddingBottomLarge: '2xl',
        maxWidth: 'default',
        content: [
          {
            renderType: 'posts',
            display: -1,
            headingLevel: 2,
            layout: 'cascade'
          }
        ]
      },
      {
        renderType: 'button',
        type: 'secondary',
        title: `All ${archiveTitle.toLowerCase()}`,
        justify: 'center',
        icon: 'arrow',
        link: archiveLink
      }
    ]
  }
}

/* Exports */

export { Term }
