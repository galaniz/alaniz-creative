/**
 * Workers - File
 */

/* Imports */

import type { FileWorkerMedia } from './FileTypes.js'

/**
 * Serve files from R2 storage.
 */
export default {
  /**
   * @param {Request} request
   * @return {Promise<Response>}
   */
  async fetch (request: Request): Promise<Response> {
    try {
      const headers = new Headers(request.headers)
      const url = new URL(request.url)
      const { pathname } = url

      /* R2 path */

      const r2Url = `https://assets.alanizcreative.com${pathname.replace('/assets', '')}`

      /* Check type */

      const isImage = /\.(jpe?g|png|gif|webp)$/i.test(pathname)
      const isVideo = /\.(mp4|mov|webm)$/i.test(pathname)

      /* Return non media files */

      if (!isImage && !isVideo) {
        return await fetch(new Request(r2Url, { headers }))
      }

      /* Format */

      const fm = url.searchParams.get('fm')
      const accept = headers.get('Accept')
      let format = !fm ? 'auto' : fm

      if (isImage && format === 'auto' && accept) {
        const isAvif = accept.includes('image/avif')
        const isWebp = accept.includes('image/webp')

        format = isAvif ? 'avif' : isWebp ? 'webp' : 'auto'
      }

      /* Transform media */

      const quality = url.searchParams.get('q')
      const width = url.searchParams.get('w')
      const height = url.searchParams.get('h')
      const media = { format } as FileWorkerMedia

      if (quality) {
        media.quality = parseInt(quality, 10)
      }

      if (width) {
        media.width = parseInt(width, 10)
      }

      if (height) {
        media.height = parseInt(height, 10)
      }

      const cf = isImage ? { image: media } : { media }
      const mediaReq = new Request(r2Url, { headers, cf })

      // @ts-expect-error - cf object conflicts with request options
      return await fetch(mediaReq)
    } catch {
      return new Response('File not found', {
        status: 404
      })
    }
  }
}
