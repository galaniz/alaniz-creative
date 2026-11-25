/**
 * Workers - Dev Types
 */

import type { LocalData } from '@alanizcreative/formation-static/local/localDataTypes.js'
import type { StoreImageMeta } from '@alanizcreative/formation-static/store/storeTypes.js'

/**
 * @typedef {object} DevData
 * @prop {LocalData} data
 * @prop {StoreImageMeta} imageMeta
 */
export interface DevData {
  data: LocalData
  imageMeta: StoreImageMeta
}
