/**
 * Utils
 */

/* Imports */

const getAllLocalData = require('./get-all-local-data')
const getLocalDataEleventy = require('./get-local-data-eleventy')
const getImage = require('./get-image')
const getLink = require('./get-link')
const getPermalink = require('./get-permalink')
const getSlug = require('./get-slug')
const getYear = require('./get-year')
const resolveInternalLinks = require('./resolve-internal-links')
const processImages = require('./process-images')

/* Exports */

module.exports = {
  getAllLocalData,
  getLocalDataEleventy,
  getImage,
  getLink,
  getPermalink,
  getSlug,
  getYear,
  resolveInternalLinks,
  processImages
}
