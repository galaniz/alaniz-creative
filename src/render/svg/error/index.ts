/**
 * Render - svg error
 */

/**
 * Function - output svg for error icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const errorSvg = (classes: string = ''): string => {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      role="img"
      ${classes !== '' ? ` class="${classes}"` : ''}
    >
      <path d="m2.6,17.08c-.24,0-.41-.1-.53-.3-.12-.2-.12-.4-.01-.59L9.48,3.4c.12-.19.3-.29.52-.29s.4.1.52.29l7.42,12.79c.11.19.11.39-.01.59-.12.2-.3.3-.53.3H2.6Zm7.46-8.77c-.14,0-.25.05-.34.14-.09.09-.14.2-.14.32v3.6c0,.14.05.25.14.34.09.09.2.14.34.14s.25-.05.34-.14c.09-.09.14-.2.14-.34v-3.6c0-.12-.05-.23-.15-.32s-.21-.14-.33-.14h0Zm0,6.58c.15,0,.28-.05.38-.16.1-.1.15-.23.15-.39,0-.14-.05-.26-.16-.35-.1-.1-.23-.15-.36-.15-.15,0-.28.05-.37.15-.1.1-.15.22-.15.38,0,.14.05.26.15.36.1.1.22.16.37.16Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default errorSvg
