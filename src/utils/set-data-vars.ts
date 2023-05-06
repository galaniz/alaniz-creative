/**
 * Utils - set data vars
 */

/* Imports */

import { slugData, envData, navData, archiveData } from '../vars/data'
import slugParentsJson from '../json/slug-parents.json'
import archiveIdsJson from '../json/archive-ids.json'
import archivePostsJson from '../json/archive-posts.json'
import navDataJson from '../json/nav-data.json'

/**
 * Function - set env, nav, slug and archive objects
 *
 * @param {object} env
 * @return {void}
 */

const setDataVars = (env: { dev: boolean, prod: boolean }): void => {
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
}

/* Exports */

export default setDataVars
