/**
 * Render - svg check
 */

/**
 * Function - output svg for checkmark
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const checkSvg = (classes: string = ''): string => {
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
      <path d="m8.77,12.08l-2.12-2.13c-.08-.1-.19-.15-.33-.15s-.26.05-.35.15c-.11.11-.17.24-.17.38s.05.26.15.35l2.42,2.4c.11.12.25.19.42.19s.31-.06.42-.19l4.85-4.83c.1-.1.15-.22.15-.35s-.06-.26-.17-.35c-.1-.1-.22-.15-.35-.15s-.26.05-.38.15l-4.52,4.54Zm1.23,5.83c-1.11,0-2.15-.2-3.11-.6-.97-.4-1.81-.96-2.52-1.68-.72-.72-1.27-1.56-1.68-2.52-.4-.97-.6-2-.6-3.11s.2-2.13.6-3.09.96-1.81,1.68-2.52c.72-.72,1.56-1.28,2.52-1.69.97-.41,2-.61,3.11-.61s2.13.2,3.09.61c.97.41,1.81.97,2.52,1.69.72.72,1.28,1.55,1.69,2.51.41.96.61,1.99.61,3.1s-.2,2.15-.61,3.11c-.41.97-.97,1.81-1.69,2.52s-1.55,1.27-2.51,1.68c-.96.4-1.99.6-3.1.6Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default checkSvg
