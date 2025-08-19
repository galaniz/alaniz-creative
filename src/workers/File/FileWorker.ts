/**
 * Workers - File
 */

/* Imports */

import type { FileWorkerImage } from './FileTypes.js'

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
      const url = new URL(request.url)
      const { pathname } = url

      /* R2 path */

      const r2Url = `https://assets.alanizcreative.com${pathname}`

      /* Check if image */

      const isImage = /\.(jpe?g|png|gif|webp)$/i.test(pathname)

      /* Return file immediately if non-image */

      if (!isImage) {
        return await fetch(new Request(r2Url))
      }

      /* Format */

      const fm = url.searchParams.get('fm')
      const accept = request.headers.get('Accept')
      let format = !fm ? 'auto' : fm

      if (format === 'auto' && accept) {
        const isAvif = accept.includes('image/avif')
        const isWebp = accept.includes('image/webp')

        format = isAvif ? 'avif' : isWebp ? 'webp' : 'auto'
      }

      /* Transform image */

      const quality = url.searchParams.get('q')
      const width = url.searchParams.get('w')
      const height = url.searchParams.get('h')
      const image = { format } as FileWorkerImage

      if (quality) {
        image.quality = parseInt(quality, 10)
      }

      if (width) {
        image.width = parseInt(width, 10)
      }

      if (height) {
        image.height = parseInt(height, 10)
      }

      const imageReq = new Request(r2Url, {
        headers: request.headers,
        cf: {
          image
        }
      })

      // @ts-expect-error - cf object conflicts with request options
      return await fetch(imageReq)
    } catch {
      return new Response('File not found', {
        status: 404
      })
    }
  }
}
