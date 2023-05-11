/**
 * Utils - set data vars
 */

/* Imports */

import { slugData, envData, navData, archiveData } from '../../vars/data'

/**
 * Function - set env, nav, slug and archive objects
 *
 * @param {object} env
 * @return {void}
 */

const setDataVars = (env: { dev: boolean, prod: boolean }): void => {
  try {
    const slugParentsJson = require('../../json/slug-parents.json')
    const archiveIdsJson = require('../../json/archive-ids.json')
    const archivePostsJson = require('../../json/archive-posts.json')
    const navDataJson = require('../../json/nav-data.json')

    /* Set env */

    if (env) {
      envData.dev = env.dev
      envData.prod = env.prod
    }

    /* Set slug parents */

    if (slugParentsJson) {
      Object.keys(slugParentsJson).forEach((s) => {
        slugData.parents[s] = slugParentsJson[s]
      })
    }

    /* Set archive ids */
    
    if (archiveIdsJson) {
      Object.keys(archiveIdsJson).forEach((a) => {
        if (slugData.bases?.[a]) {
          slugData.bases[a].archiveId = archiveIdsJson[a]
        }
      })
    }

    /* Set archive posts */
    
    if (archivePostsJson) {
      Object.keys(archivePostsJson).forEach((a) => {
        archiveData.posts[a] = archivePostsJson[a]
      })
    }

    /* Set nav data */
    
    if (navDataJson) {
      navData.navs = navDataJson.navs
      navData.items = navDataJson.items
    }
  } catch (err) {

  }
}

/* Exports */

export default setDataVars
