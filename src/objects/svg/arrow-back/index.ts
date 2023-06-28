/**
 * Render - svg arrow back
 */

/**
 * Function - output svg for left facing arrow
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const arrowBackSvg = (classes: string = ''): string => {
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
      <path d="m9.31,16.23l-5.79-5.79c-.07-.07-.12-.14-.15-.21-.03-.07-.04-.15-.04-.23s.01-.16.04-.23c.03-.07.08-.14.15-.21l5.81-5.81c.11-.11.25-.17.42-.17s.31.06.44.19.19.27.19.44-.06.31-.19.44l-4.73,4.73h10.33c.18,0,.33.06.45.18.12.12.18.27.18.45s-.06.33-.18.45c-.12.12-.27.18-.45.18H5.46l4.75,4.75c.11.11.17.25.17.42s-.06.31-.19.44-.27.19-.44.19-.31-.06-.44-.19Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default arrowBackSvg
