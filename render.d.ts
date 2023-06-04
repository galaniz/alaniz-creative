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
    wave?: string
    blob?: string
    border?: boolean
    action?: {
      text: string
      internalLink: Render.InternalLink
    }
  }
}
