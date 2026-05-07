/**
 * Workers - File Types
 */

/**
 * @typedef {object} FileWorkerMedia
 * @see {@link https://developers.cloudflare.com/images/transform-images/transform-via-workers/|Cloudflare} for source.
 * @prop {number} [width]
 * @prop {number} [height]
 * @prop {number} [quality]
 * @prop {'auto'|'avif'|'webp'|'jpeg'|'png'|'json'} [format]
 */
export interface FileWorkerMedia {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'avif' | 'webp' | 'jpeg' | 'png' | 'json'
}
