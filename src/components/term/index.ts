/**
 * Components - term
 */

/* Imports */

import getArchiveLink from '@alanizcreative/static-site-formation/src/utils/get-archive-link'
import container from '@alanizcreative/static-site-formation/src/layouts/container'
import button from '../../objects/button'
import posts from '../../objects/posts'

/**
 * Function - output main content for term
 *
 * @param {object} args
 * @param {string} args.taxonomy
 * @param {string} args.contentType
 * @param {string} args.id
 * @return {string} HTML - html
 */

const term = (taxonomy: string = '', contentType: string = '', id: string = ''): string => {
  /* All params required */

  if (taxonomy === '' || contentType === '' || id === '') {
    return ''
  }

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

  const termArchiveData = getArchiveLink(taxonomy)

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
        taxonomy,
        termId: id,
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

export default term
