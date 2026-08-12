/**
 * Store
 */

/* Imports */

import type { Store } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * Store values that are the same on every build.
 *
 * Image metadata is not here — it is read from `media/imageMeta.json` at build
 * time, because the media library writes to it.
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
