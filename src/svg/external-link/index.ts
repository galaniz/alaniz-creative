/**
 * Render - svg external link
 */

/**
 * Function - output svg for external link icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const externalLinkSvg = (classes: string = ''): string => {
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
      <path d="m4.17,5.62c-.28,0-.54.11-.74.31s-.31.46-.31.74v9.17c0,.28.11.54.31.74.2.2.46.31.74.31h9.17c.28,0,.54-.11.74-.31.2-.2.31-.46.31-.74v-5c0-.35.28-.62.62-.62s.62.28.62.62v5c0,.61-.24,1.19-.67,1.62s-1.01.67-1.62.67H4.17c-.61,0-1.19-.24-1.62-.67s-.67-1.01-.67-1.62V6.67c0-.61.24-1.19.67-1.62s1.01-.67,1.62-.67h5c.35,0,.62.28.62.62s-.28.62-.62.62h-5Zm13.91-3.37c-.02-.05-.06-.09-.09-.14-.02-.02-.02-.05-.04-.07-.01-.01-.03-.02-.04-.03-.05-.04-.1-.08-.16-.11-.08-.03-.16-.05-.24-.05,0,0,0,0,0,0h-5c-.35,0-.62.28-.62.62s.28.62.62.62h3.49L7.89,11.22c-.24.24-.24.64,0,.88.24.24.64.24.88,0l8.1-8.1v3.49c0,.35.28.62.62.62s.62-.28.62-.62V2.5c0-.08-.02-.17-.05-.24Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default externalLinkSvg
