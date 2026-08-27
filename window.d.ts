/**
 * Window
 */

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'timeout-callback'?: () => void
          'error-callback'?: (error: string) => void
        }
      ) => string | null | undefined
      reset: (container?: string | HTMLElement) => void
    }
  }
}

export {}
