/**
 * Workers - File Types
 */

/**
 * @typedef {object} FileWorkerImage
 * @prop {string} [fit]
 * @prop {number} [width]
 * @prop {number} [height]
 * @prop {number} [quality]
 * @prop {string} [gravity]
 * @prop {string} [format]
 * @see {@link https://developers.cloudflare.com/images/transform-images/transform-via-workers/|Cloudflare}
 */
export interface FileWorkerImage {
  fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
  width?: number
  height?: number
  quality?: number
  gravity?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'auto'
  format?: 'auto' | 'avif' | 'webp' | 'jpeg' | 'png' | 'json'
}
