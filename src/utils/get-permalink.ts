/**
 * Utils - get permalink
 */

/* Imports */

import { envData } from '../vars/data'

/**
 * Function - get absolute or relative url
 *
 * @param {string} slug
 * @param {boolean} trailingSlash
 * @return {string}
 */

const getPermalink = (slug: string = '', trailingSlash: boolean = true): string => {
  let url = '/'

  if (envData.prod) {
    url = envData.urls.prod
  }

  return `${url}${slug}${slug && trailingSlash ? '/' : ''}`
}

/* Exports */

export default getPermalink
