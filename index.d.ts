/**
 * Alaniz Creative - type definitions
 */

import FRM from '@alanizcreative/static-site-formation'

declare global {
  namespace AC {
    /* Image data */

    interface Image {
      base: string
      width: number
      height: number
    }

    /* Item/link data */

    interface InternalLink extends FRM.InternalLinkBase {
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

    /* Hero arguments */

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
