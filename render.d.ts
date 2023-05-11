/**
 * Render - interfaces
 */

declare namespace Render {
  interface Return {
    start: string
    end: string
  }

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
    hero?: {
      title: string
      border?: boolean
      image?: Image
      action?: {
        text: string
        internalLink: InternalLink
      }
      blob?: {
        path: string
        width: number
        height: number
      }
    }
    svg?: {
      blob?: {
        path: string
      }
    }
    theme?: {
      main: {
        dark: string
      }
    }
  }

  interface NavItem {
    id?: string
    title: string
    link?: string
    internalLink?: Render.InternalLink
    externalLink?: string
    children?: NavItem[]
    current?: boolean
    external?: boolean
    descendentCurrent?: boolean
  }

  interface Nav {
    title?: string
    location: string
    items: NavItem[]
  }

  interface ContainerProps {
    args: {
      tag?: string
      layout?: string
      maxWidth?: string
      paddingTop?: string
      paddingTopLarge?: string
      paddingBottom?: string
      paddingBottomLarge?: string
      gap?: string
      gapLarge?: string
      justify?: string
      align?: string
      classes?: string
      attr?: string
      richTextStyles?: boolean
    }
    parents?: object[]
  }

  interface ColumnProps {
    args: {
      tag?: string
      width?: string
      widthSmall?: string
      widthMedium?: string
      widthLarge?: string
      widthCustom?: {
        default: string
        small: string
        medium: string
        large: string
      }
      justify?: string
      align?: string
      grow?: boolean
      classes?: string
      style?: string
      attr?: string
    }
    parents?: object[]
  }

  interface HeroArgs {
    contentType?: string
    archive?: string
    type?: string
    title?: string
    text?: string
    image?: Render.Image
    wave?: {
      path: string
      width: number
      height: number
    }
    blob?: {
      path: string
    }
    border?: boolean
    action?: {
      text: string
      internalLink: Render.InternalLink
    }
  }
}
