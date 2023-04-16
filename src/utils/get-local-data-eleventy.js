/**
 * Utils - get local data eleventy
 */

/* Imports */

const { AssetCache } = require('@11ty/eleventy-fetch')
const { envData } = require('../vars/data')
const { readdir, readFile } = require('node:fs/promises')
const { extname, basename, resolve } = require('node:path')
const resolveInternalLinks = require('./resolve-internal-links')

/**
 * Function - fetch data from cache if available
 *
 * @param {string} key
 * @param {string} params
 * @return {object}
 */

const getLocalDataEleventy = async (key, params = {}) => {
  try {
    if (!key) {
      throw new Error('No key')
    }

    /* Cache is only for local dev */

    let cache

    if (envData.eleventy.cache) {
      cache = new AssetCache(key)

      /* Check if the cache is fresh within the last day */

      if (cache.isCacheValid('1d')) {
        return cache.getCachedValue()
      }
    }

    /* Fetch new data */

    const { all = true, id } = params

    let data = {
      content: {
        page: [],
        work: []
      },
      navs: [],
      navItems: [],
      redirects: []
    }

    const flatData = {}

    if (all) {
      const files = await readdir(`./json/`)

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const fileExt = extname(file)
          const fileName = basename(file, fileExt)

          if (fileExt !== '.json') {
            continue
          }

          const fileContents = await readFile(resolve(`./json/${file}`), { encoding: 'utf8' })
          
          if (fileContents) {
            const fileJson = JSON.parse(fileContents)

            if (fileJson) {
              flatData[fileName] = fileJson
            }
          }
        }

        resolveInternalLinks(flatData, flatData)

        Object.keys(flatData).forEach((f) => {
          const ff = flatData[f]
          const { contentType } = ff

          ff.id = f

          if (contentType === 'navigation') {
            data.navs.push(ff)
          }

          if (contentType === 'navigationItem') {
            data.navItems.push(ff)
          }

          if (contentType === 'redirect') {
            data.redirects.push(ff)
          }

          if (contentType === 'page') {
            data.content.page.push(ff)
          }

          if (contentType === 'work') {
            data.content.work.push(ff)
          }
        })
      }
    }

    if (!all && id) {

    }

    /*if (envData.eleventy.cache && cache) {
      await cache.save(JSON.parse(data), 'json')
    }*/

    return data
  } catch (error) {
    console.error('Error fetching local data - 11ty: ', error)

    return {}
  }
}

/* Exports */

module.exports = getLocalDataEleventy
