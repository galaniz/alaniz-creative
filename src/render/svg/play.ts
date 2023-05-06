/**
 * Render - svg play
 */

/**
 * Function - output svg for play icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const playSvg = (classes: string = ''): string => {
  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
      role="img"
      ${classes ? ` class="${classes}"` : ''}
    >
      <path d="m19.02,8.3c1.31.76,1.31,2.65,0,3.4l-13.91,8.03c-1.31.76-2.95-.19-2.95-1.7V1.97C2.16.46,3.8-.49,5.11.27l13.91,8.03Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default playSvg
