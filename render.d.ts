/**
 * Render - interfaces
 */

declare namespace Render {
  interface Image {
    base: string;
    width: number;
    height: number;
  }

  interface InternalLink {
    id: string;
    contentType: string;
    slug: string;
    title?: string;
    hero?: {
      title: string;
      border?: boolean;
      image?: Image;
      action?: {
        text: string;
        internalLink: InternalLink;
      }
      blob?: {
        path: string;
        width: number;
        height: number;
      }
    }
    svg?: {
      blob?: {
        path: string;
      }
    }
    theme?: {
      main: {
        dark: string;
      }
    }
  }

  interface ContainerProps {
    args: {
      tag?: string;
      layout?: string;
      maxWidth?: string;
      paddingTop?: string;
      paddingTopLarge?: string;
      paddingBottom?: string;
      paddingBottomLarge?: string;
      gap?: string;
      gapLarge?: string;
      justify?: string;
      align?: string;
      classes?: string;
      attr?: string;
      richTextStyles?: boolean;
    }
  }
  
  interface ColumnProps {
    args: {
      tag?: string;
      width?: string;
      widthSmall?: string;
      widthMedium?: string;
      widthLarge?: string;
      widthCustom?: {
        default: string;
        small: string;
        medium: string;
        large: string;
      }
      justify?: string;
      align?: string;
      grow?: boolean;
      classes?: string;
      style?: string;
      attr?: string;
    }
  }  
}
