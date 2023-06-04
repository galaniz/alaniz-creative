/**
 * Utils - get archive link
 */

/* Imports */

import { slugData } from '../../vars/data'
import getPermalink from '../get-permalink'
import getSlug from '../get-slug'

/**
 * Function - get archive link by content type
 *
 * @param {string} contentType
 * @return {object}
 */

interface Return {
  title: string
  link: string
}

const getArchiveLink = (contentType: string = 'work'): Return => {
  let archiveLink = ''
  let archiveTitle = ''

  if (slugData.bases[contentType] !== undefined) {
    archiveTitle = slugData.bases[contentType].title

    const archiveId: string = slugData.bases[contentType].archiveId
    const archiveSlug: string = slugData.bases[contentType].slug

    if (archiveId !== '' && archiveSlug !== '') {
      const s = getSlug({
        id: archiveId,
        slug: archiveSlug,
        contentType: 'page'
      })

      if (typeof s === 'string') {
        archiveLink = getPermalink(s)
      }
    }
  }

  return {
    title: archiveTitle,
    link: archiveLink
  }
}

/* Exports */

export default getArchiveLink
