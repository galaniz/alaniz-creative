"use strict";
/**
 * Render - svg info icon
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Function - output svg for info icon
 *
 * @param {string} classes
 * @return {string} HTML - svg
 */
const infoSvg = (classes = '') => {
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
      <path d="m9.44,14.17h1.25v-5h-1.25v5Zm.56-6.54c.19,0,.36-.06.49-.19.13-.13.2-.29.2-.47,0-.2-.07-.37-.2-.5-.13-.14-.29-.2-.49-.2s-.36.07-.49.2c-.13.14-.2.3-.2.5,0,.19.07.35.2.47.13.13.29.19.49.19Zm0,10.71c-1.15,0-2.23-.22-3.24-.66-1.01-.44-1.89-1.03-2.65-1.79-.76-.76-1.35-1.64-1.79-2.65-.44-1.01-.66-2.09-.66-3.24s.22-2.23.66-3.24c.44-1.01,1.03-1.89,1.79-2.64.76-.75,1.64-1.34,2.65-1.78,1.01-.44,2.09-.66,3.24-.66s2.23.22,3.24.66c1.01.44,1.89,1.03,2.64,1.78.75.75,1.34,1.63,1.78,2.65s.66,2.1.66,3.24-.22,2.23-.66,3.24c-.44,1.01-1.03,1.89-1.78,2.65-.75.75-1.63,1.35-2.65,1.79-1.01.44-2.1.66-3.24.66Z" fill="currentcolor" />
    </svg>
  `;
};
/* Exports */
exports.default = infoSvg;
