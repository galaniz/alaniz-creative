/**
 * Store
 */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Store values that are the same on every build.
 *
 * @type {Store}
 */
const storeArgs: Partial<Store> = {
  archiveMeta: {
    work: {
      plural: 'Work items',
      singular: 'Work item'
    }
  }
}

/* Exports */

export { storeArgs }
