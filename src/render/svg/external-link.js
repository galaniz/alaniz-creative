/**
 * Render - svg external link
 */

/**
 * Function - output svg for external link icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const externalLinkSvg = (classes = '') => {
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
      <path d="m14.5,9.9v5.4c0,.25-.1.47-.26.64-.16.16-.39.26-.64.26H3.7c-.25,0-.47-.1-.64-.26-.16-.16-.26-.39-.26-.64V5.4c0-.25.1-.47.26-.64.16-.16.39-.26.64-.26h5.4c.5,0,.9-.4.9-.9s-.4-.9-.9-.9H3.7c-.75,0-1.42.3-1.91.79-.49.49-.79,1.16-.79,1.91v9.9c0,.75.3,1.42.79,1.91.49.49,1.16.79,1.91.79h9.9c.75,0,1.42-.3,1.91-.79.49-.49.79-1.16.79-1.91v-5.4c0-.5-.4-.9-.9-.9s-.9.4-.9.9Zm-5.66,1.54L17.2,3.07v3.23c0,.5.4.9.9.9s.9-.4.9-.9V.9c0-.12-.02-.24-.07-.34-.04-.11-.11-.21-.19-.29h0c-.08-.08-.18-.15-.29-.2-.11-.04-.22-.07-.34-.07h-5.4c-.5,0-.9.4-.9.9s.4.9.9.9h3.23L7.56,10.16c-.35.35-.35.92,0,1.27.35.35.92.35,1.27,0Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

module.exports = externalLinkSvg
