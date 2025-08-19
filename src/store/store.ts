/**
 * Store
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Archive meta.
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
