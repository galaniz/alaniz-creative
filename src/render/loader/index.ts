/**
 * Render - loader
 */

/**
 * Function - output loader
 *
 * @param {object} args
 * @param {boolean} args.hide
 * @param {string} args.classes
 * @param {boolean} args.ariaHidden
 * @param {string} args.a11yHideText
 * @return {string} HTML - span
 */

interface Args {
  hide?: boolean
  classes?: string
  ariaHidden?: boolean
  a11yHideText?: string
}

const loader = (args: Args = {}): string => {
  const {
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

  /* A11y hidden text */

  let a11yHideTextOutput = ''

  if (a11yHideText !== '') {
    a11yHideTextOutput = `<span class="a11y-visually-hidden reduce-motion-hide">${a11yHideText}</span>`
  }

  /* Output */

  return `
    <span class="o-loader l-absolute l-top-0 l-left-0 l-right-0 l-bottom-0 l-flex l-align-center l-justify-center e-transition${classes !== '' ? ` ${classes}` : ''}"${attr}>
      <span class="l-height-l l-width-l b-radius-100-pc reduce-motion-hide"></span>
      <span class="t-s t-weight-bold l-none reduce-motion-show">Loading</span>
      ${a11yHideTextOutput}
    </span>
  `
}

/* Exports */

export default loader
