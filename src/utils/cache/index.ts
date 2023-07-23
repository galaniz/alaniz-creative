/**
 * Utils - cache
 */

/* Imports */

// @ts-expect-error
import { AssetCache } from '@11ty/eleventy-fetch'
import safeJsonStringify from 'safe-json-stringify'

/**
 * Function - set/get 11ty cache
 *
 * @param {string} key
 * @param {string} type
 * @param {*} data
 * @return {*}
 */

interface Cache {
  isCacheValid: Function
  getCachedValue: Function
  save: Function
}

const cache = async (key: string = '', type: string = 'get', data: any): Promise<any> => {
  const cacheInstance: Cache = new AssetCache(key)

  let cacheValue: any

  if (type === 'get') {
    cacheValue = cacheInstance.isCacheValid('1d') === true ? cacheInstance.getCachedValue() : undefined
  } else {
    await cacheInstance.save(JSON.parse(safeJsonStringify(data)), 'json')
  }

  return cacheValue
}

/* Exports */

export default cache
