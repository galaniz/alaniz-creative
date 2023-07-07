"use strict";
/**
 * Objects - loader
 */
Object.defineProperty(exports, "__esModule", { value: true });
const loader = (args = {}) => {
    const { hide = true, size = 'default', classes = '', ariaHidden = true, a11yHideText = '' } = args;
    /* Attributes */
    let attr = '';
    if (hide) {
        attr += ' data-hide';
    }
    if (ariaHidden) {
        attr += ' aria-hidden="true"';
    }
    if (size === 's') {
        attr += 'data-size="s"';
    }
    /* A11y hidden text */
    let a11yHideTextOutput = '';
    if (a11yHideText !== '') {
        a11yHideTextOutput = `<span class="a11y-visually-hidden reduce-motion-hide">${a11yHideText}</span>`;
    }
    /* Output */
    return `
    <span class="o-loader l-absolute l-top-0 l-left-0 l-right-0 l-bottom-0 l-flex l-align-center l-justify-center e-transition${classes !== '' ? ` ${classes}` : ''}"${attr}>
      <span class="l-height-l l-width-l b-radius-100-pc reduce-motion-hide"></span>
      <span class="t-s t-weight-bold l-none reduce-motion-show">Loading</span>
      ${a11yHideTextOutput}
    </span>
  `;
};
/* Exports */
exports.default = loader;
