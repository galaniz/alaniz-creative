/**
 * Render - term content
 */

/* Imports */

import { getArchiveLink } from '../../utils'
import button from '../../objects/Button/Button'
import container from '../container'
import posts from '../posts'

/**
 * Function - output main content for term
 *
 * @param {object} args
 * @param {string} args.contentType
 * @param {string} args.id
 * @return {string} HTML - html
 */

const termContent = (contentType: string = 'workCategory', id: string = ''): string => {
  /* Containing output */

  const containers = {
    section: container({
      args: {
        maxWidth: 's',
        tag: 'section',
        paddingBottom: 'xl',
        paddingBottomLarge: '2xl'
      }
    })
  }

  /* Archive links */

  let archiveLink = ''

  const termArchiveData = getArchiveLink(contentType)

  if (termArchiveData.title !== '' && termArchiveData.link !== '') {
    archiveLink = button({
      args: {
        title: `All ${termArchiveData.title.toLowerCase()}`,
        iconBefore: 'arrow',
        type: 'secondary',
        justify: 'center',
        link: termArchiveData.link
      }
    })
  }

  /* Output */

  return `
    ${containers.section.start}
    ${posts({
      args: {
        contentType,
        id,
        display: -1,
        headingLevel: 2,
        layout: 'cardsCascading'
      }
    })}
    ${containers.section.end}
    ${archiveLink}
  `
}

/* Exports */

export default termContent
