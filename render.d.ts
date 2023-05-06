/**
 * Render - interfaces
 */

declare namespace Render {
  interface InternalLink {
    id: string;
    contentType: string;
    slug: string;
    title?: string;
    hero?: {
      title: string;
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
