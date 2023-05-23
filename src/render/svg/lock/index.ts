/**
 * Render - svg lock
 */

/**
 * Function - output svg for lock icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */

const lockSvg = (classes: string = ''): string => {
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
      <path d="m4.95,17.92c-.33,0-.61-.12-.85-.36-.24-.24-.36-.52-.36-.85v-8.34c0-.33.12-.62.36-.85.24-.23.52-.35.85-.35h1.45v-1.91c0-1,.35-1.85,1.05-2.55.7-.7,1.55-1.05,2.55-1.05s1.85.35,2.55,1.05c.7.7,1.05,1.55,1.05,2.55v1.91h1.45c.33,0,.61.12.85.35.24.23.36.52.36.85v8.34c0,.33-.12.61-.36.85-.24.24-.52.36-.85.36H4.95Zm0-.95h10.1c.07,0,.14-.02.18-.07.05-.05.07-.11.07-.18v-8.34c0-.07-.02-.14-.07-.18-.05-.05-.11-.07-.18-.07H4.95c-.07,0-.14.02-.18.07-.05.05-.07.11-.07.18v8.34c0,.07.02.14.07.18.05.05.11.07.18.07Zm5.05-3.01c.39,0,.72-.14,1-.41.28-.27.41-.6.41-.98s-.14-.7-.42-1c-.28-.29-.61-.44-1-.44s-.72.15-1,.44c-.28.29-.41.63-.41,1.01s.14.7.42.97c.28.27.61.41,1,.41Zm-2.66-6.78h5.3v-1.91c0-.74-.26-1.36-.77-1.88-.52-.52-1.14-.77-1.88-.77s-1.36.26-1.88.77c-.52.52-.78,1.14-.78,1.88v1.91Z" fill="currentcolor" />
    </svg>
  `
}

/* Exports */

export default lockSvg
