/**
 * Render - interfaces
 */

declare namespace Render {
  interface Image {
    base: string
    width: number
    height: number
  }

  interface WorkCat {
    title: string
  }

  interface InternalLink {
    id: string
    contentType: string
    slug: string
    title?: string
    text?: string
    category?: WorkCat[]
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
    image?: Render.Image
    wave?: string
    blob?: string
    border?: boolean
    action?: {
      text: string
      internalLink: Render.InternalLink
    }
  }
}
