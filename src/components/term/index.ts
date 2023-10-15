/**
 * Components - term
 */

/* Imports */

import getArchiveLink from '@alanizcreative/static-site-formation/lib/utils/get-archive-link'
import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import button from '../../objects/button'
import posts from '../../objects/posts'
import config from '../../config'

/**
 * Function - output main content for term
 *
 * @param {object} args
 * @param {string} args.contentType
 * @param {string} args.linkContentType
 * @param {string} args.id
 * @return {string} HTML - html
 */

const term = (contentType: string = '', linkContentType: string = 'default', id: string = ''): string => {
  /* Content type and link content type required */

  if (contentType === '') {
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

  const termArchiveData = getArchiveLink(contentType, linkContentType)

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

  /* Link content type array */

  let linkContentTypeArray: string[] = []

  if (linkContentType === 'default') {
    linkContentTypeArray = config.contentTypes.taxonomy[contentType].contentTypes
  } else {
    linkContentTypeArray = [linkContentType]
  }

  /* Output */

  return `
    ${containers.section.start}
    ${posts({
      args: {
        contentType,
        linkContentType: linkContentTypeArray,
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
