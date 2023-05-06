/**
 * Utils - get link
 */

/* Imports */

import getPermalink from './get-permalink'
import getSlug from './get-slug'

/**
 * Function - get permalink from external or internal source
 *
 * @param {object} internalLink
 * @param {string} externalLink
 * @return {string}
 */

interface InternalLink {
  id: string;
  contentType: string;
  slug: string;
}

const getLink = (internalLink: InternalLink | undefined, externalLink: string = ''): string => {
  if (internalLink) {
    const slug = getSlug(internalLink)

    if (typeof slug === 'string') {
      return getPermalink(slug)
    }

    return ''
  }

  return externalLink
}

/* Exports */

export default getLink
