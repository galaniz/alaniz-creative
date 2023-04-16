/**
 * Utils - get link
 */

/* Imports */

const getPermalink = require('./get-permalink')
const getSlug = require('./get-slug')

/**
 * Function - get permalink from external or internal source
 *
 * @param {object} internalLink
 * @param {string} externalLink
 * @return {string|object}
 */

const getLink = (internalLink, externalLink = '') => {
  if (externalLink) {
    return externalLink
  } else if (internalLink) {
    return getPermalink(getSlug({
      contentType: internalLink.contentType,
      slug: internalLink.slug
    }))
  }
}

/* Exports */

module.exports = getLink
