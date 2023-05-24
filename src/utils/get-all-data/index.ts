/**
 * Utils - get all data
 */

/* Imports */

import safeJsonStringify from 'safe-json-stringify'
import { AssetCache } from '@11ty/eleventy-fetch'
import { readdir, readFile } from 'node:fs/promises'
import { extname, basename, resolve } from 'node:path'
import { envData } from '../../vars/data'
import resolveInternalLinks from '../resolve-internal-links'

/**
 * Function - fetch data from cache if available
 *
 * @param {string} key
 * @param {object} params
 * @return {object}
 */

interface Params {
  all?: boolean
  id?: number
}

interface Cache {
  isCacheValid?: Function
  getCachedValue?: Function
  save?: Function
}

interface Page {
  parent: {
    id: string
    slug: string
    title: string
  }
  id: string
  archive: string
}

interface Return {
  content: {
    page: Page[]
    work: object[]
  }
  navs: Render.Nav[]
  navItems: Render.NavItem[]
  redirects: object[]
  archivePosts: {
    work: object[]
  }
}

const getAllData = async (key: string = '', params: Params = {}): Promise<Return | undefined> => {
  try {
    if (key === '') {
      throw new Error('No key')
    }

    /* Cache is only for local dev */

    let cache: Cache = {}

    if (envData.eleventy.cache) {
      cache = new AssetCache(key)

      /* Check if the cache is fresh within the last day */

      if (((cache?.isCacheValid) !== undefined) && ((cache?.getCachedValue) !== undefined) && cache.isCacheValid('1d') === true) {
        return cache.getCachedValue()
      }
    }

    /* Fetch new data */

    const {
      all = true,
      id = ''
    } = params

    const data = {}

    if (id !== '') {
      const file = await readFile(resolve(`./json/${id}.json`), { encoding: 'utf8' })

      if (file !== '') {
        const fileJson = JSON.parse(file)

        if (fileJson !== '') {
          data[id] = fileJson
        }
      }
    }

    if (all) {
      const files = await readdir('./json/')

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = extname(file)
        const fileName = basename(file, fileExt)

        if (fileExt !== '.json') {
          continue
        }

        const fileContents = await readFile(resolve(`./json/${file}`), { encoding: 'utf8' })

        if (fileContents !== '') {
          const fileJson = JSON.parse(fileContents)

          if (fileJson !== '') {
            data[fileName] = fileJson
          }
        }
      }
    }

    /* All data */

    const content: { page: Page[], work: object[] } = {
      page: [],
      work: []
    }

    const navs: Render.Nav[] = []
    const navItems: Render.NavItem[] = []
    const redirects: object[] = []
    const archivePosts: { work: object[] } = {
      work: []
    }

    if (Object.keys(data).length > 0) {
      const imageJson = await readFile(resolve('./src/json/image-data.json'), { encoding: 'utf8' })
      const imageData = imageJson != null ? JSON.parse(imageJson) : {}

      resolveInternalLinks(imageData, data, ['metaImage', 'image'])
      resolveInternalLinks(data, data, ['items', 'internalLink'])

      Object.keys(data).forEach((d) => {
        const dd = data[d]
        const { contentType } = dd

        dd.id = d

        if (contentType === 'navigation') {
          navs.push(dd)
        }

        if (contentType === 'navigationItem') {
          navItems.push(dd)
        }

        if (contentType === 'redirect') {
          redirects.push(dd)
        }

        if (contentType === 'page') {
          content.page.push(dd)
        }

        if (contentType === 'work') {
          content.work.push(dd)

          const ddd: { content?: object } = structuredClone(dd)

          if (ddd?.content !== undefined) {
            delete ddd.content
          }

          archivePosts.work.push(ddd)
        }
      })
    }

    const allData = {
      content,
      navs,
      navItems,
      redirects,
      archivePosts
    }

    /* Store in local cache */

    if (envData.eleventy.cache && ((cache?.save) !== undefined)) {
      await cache.save(JSON.parse(safeJsonStringify(allData)), 'json')
    }

    /* Output */

    return allData
  } catch (error) {
    console.error('Error getting all data: ', error)
  }
}

/* Exports */

export default getAllData
