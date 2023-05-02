/**
 * Utils - get all local data
 */

/* Imports */

// const slugsJson = require('../json/slugs.json')

/**
 * Function - fetch data from all content types or single entry if serverless
 *
 * @param {object} serverlessData
 * @param {object} previewData
 * @param {function} getLocalData
 * @return {object|boolean}
 */

const getAllLocalData = async (serverlessData, getLocalData) => {
  try {
    /* Get local data function required */

    if (!getLocalData) {
      return false
    }

    /* All data or single entry */

    let content = {
      page: [],
      work: []
    }

    let navs = []
    let navItems = []
    let redirects = []
    let archivePosts = {}
    let entry = false

    if (serverlessData) {
      let contentType = ''
      let id = ''

      /*if (slugsJson?.[serverlessData.path]) {
        const item = slugsJson[serverlessData.path]

        contentType = item.contentType
        id = item.id
      }*/

      if (id) {
        entry = await getLocalData(`serverless_${id}`,
          {
            id,
            all: false
          }
        )

        if (entry?.items) {
          content[contentType] = entry.items
        }
      }
    }

    if (!serverlessData || !entry) {
      const all = await getLocalData('local_all_content_types')

      if (all?.content) {
        content = all.content
      }

      if (all?.redirects) {
        redirects = all.redirects
      }

      if (all?.navs) {
        navs = all.navs
      }

      if (all?.navItems) {
        navItems = all.navItems
      }

      if (all?.archivePosts) {
        archivePosts = all.archivePosts
      }
    }

    /* Output */

    return {
      content,
      navs,
      navItems,
      redirects,
      archivePosts
    }
  } catch (error) {
    console.error('Error getting all local data: ', error)

    return false
  }
}

/* Exports */

module.exports = getAllLocalData
