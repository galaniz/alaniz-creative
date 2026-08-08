/**
 * Workers - Snapshot Types
 */

import type { Generic } from '@alanizcreative/formation-static/global/globalTypes.js'
import type { R2Bucket } from '@cloudflare/workers-types'

/**
 * @typedef {object} SnapshotEnv
 * @extends {Generic}
 * @prop {R2Bucket} SNAPSHOT_BUCKET
 */
export interface SnapshotEnv extends Generic {
  SNAPSHOT_BUCKET: R2Bucket
}
