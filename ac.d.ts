/**
 * Alaniz Creative - interfaces
 */

import FRM from '@alanizcreative/static-site-formation'

declare global {
  namespace AC {
    interface Image {
      base: string
      width: number
      height: number
    }

    interface InternalLink {
      id: string
      contentType: string
      slug: string
      title?: string
      text?: string
      category?: Array<{
        title: string
      }>
      passwordProtected?: boolean
      hero?: {
        title: string
        border?: boolean
        image?: Image
        wave?: string
        blob?: string
        action?: {
          text: string
          internalLink: InternalLink
        }
      }
      svg?: {
        blob?: string
      }
      theme?: {
        main: {
          dark: string
        }
      }
    }

    interface HeroArgs {
      contentType?: string
      archive?: string
      type?: string
      title?: string
      text?: string
      image?: Image
      wave?: string
      blob?: string
      border?: boolean
      action?: {
        text: string
        internalLink: InternalLink
      }
    }
  }
}

export default FRM
