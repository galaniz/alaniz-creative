/**
 * Workers - File Types
 */

/**
 * @typedef {'auto'|'avif'|'webp'|'jpeg'|'png'|'json'} FileWorkerMediaFormat
 */
export type FileWorkerMediaFormat = 'auto' | 'avif' | 'webp' | 'jpeg' | 'png' | 'json'

/**
 * @typedef {object} FileWorkerMedia
 * @see {@link https://developers.cloudflare.com/images/transform-images/transform-via-workers/|Cloudflare} for source.
 * @prop {number} [width]
 * @prop {number} [height]
 * @prop {number} [quality]
 * @prop {FileWorkerMediaFormat} [format]
 */
export interface FileWorkerMedia {
  width?: number
  height?: number
  quality?: number
  format?: FileWorkerMediaFormat
}
