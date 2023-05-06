/**
 * Render - loader
 */

/**
 * Function - output loader
 *
 * @param {object} args {
 *  @prop {boolean} hide
 *  @prop {string} classes
 *  @prop {boolean} ariaHidden
 *  @prop {string} a11yHideText
 * }
 * @return {string} HTML - span
 */

const loader = (args = {}) => {
  let {
    hide = true,
    classes = '',
    ariaHidden = true,
    a11yHideText = ''
  } = args

  /* Attributes */

  let attr = ''

  if (hide) {
    attr += ' data-hide'
  }

  if (ariaHidden) {
    attr += ' aria-hidden="true"'
  }

  if (a11yHideText) {
    a11yHideText = `<span class="a11y-visually-hidden reduce-motion-hide">${a11yHideText}</span>`
  }

  /* Classes */

  classes = `o-loader l-absolute l-top-0 l-left-0 l-right-0 l-bottom-0 l-flex l-align-center l-justify-center e-transition${classes ? ` ${classes}` : ''}`

  /* Output */

  return `
    <span class="${classes}"${attr}>
      <span class="l-height-l l-width-l b-radius-100-pc reduce-motion-hide"></span>
      <span class="t-s t-weight-bold l-none reduce-motion-show">Loading</span>
      ${a11yHideText}
    </span>
  `
}

/* Exports */

export default loader
