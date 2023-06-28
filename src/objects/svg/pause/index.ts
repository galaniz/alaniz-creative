/**
 * Render - svg pause
 */

/**
 * Function - output svg for pause icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const pauseSvg = (classes: string = ''): string => {
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
      <path d="m4.09,0h0c.75,0,1.36.61,1.36,1.36v17.27c0,.75-.61,1.36-1.36,1.36h0c-.75,0-1.36-.61-1.36-1.36V1.36c0-.75.61-1.36,1.36-1.36Z" fill="currentcolor" />
      <path d="m15.91,0h0c.75,0,1.36.61,1.36,1.36v17.27c0,.75-.61,1.36-1.36,1.36h0c-.75,0-1.36-.61-1.36-1.36V1.36c0-.75.61-1.36,1.36-1.36Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default pauseSvg
