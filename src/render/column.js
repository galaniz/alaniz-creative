/**
 * Render - column
 */

/**
 * Function - output column wrapper
 *
 * @param {object} args {
 *  @prop {string} tag
 *  @prop {string} width
 *  @prop {string} widthSmall
 *  @prop {string} widthMedium
 *  @prop {string} widthLarge
 *  @prop {object} widthCustom
 *  @prop {string} justify
 *  @prop {string} align
 *  @prop {string} order
 *  @prop {string} orderSmall
 *  @prop {string} orderMedium
 *  @prop {string} orderLarge
 *  @prop {string} classes
 *  @prop {string} style
 *  @prop {string} attr
 * }
 * @return {object}
 */

const column = ({ args = {} }) => {
  let {
    tag = 'div',
    width = '',
    widthSmall = '',
    widthMedium = '',
    widthLarge = '',
    widthCustom = false,
    justify = '',
    align = '',
    grow = '',
    classes = '', // Back end option
    style = '', // Back end option
    attr = '' // Back end option
  } = args

  /* Classes */

  classes = [classes]

  /* Width */

  if (!width && !widthCustom) {
    width = '1-1'
  }

  if (width) {
    classes.push(`l-width-${width}`)
  }

  if (widthSmall && widthSmall !== width) {
    classes.push(`l-width-${widthSmall}-s`)
  }

  if (widthMedium && widthMedium !== widthSmall) {
    classes.push(`l-width-${widthMedium}-m`)
  }

  if (widthLarge && widthLarge !== widthMedium) {
    classes.push(`l-width-${widthLarge}-l`)
  }

  /* Justify */

  if (justify) {
    classes.push(`l-justify-${justify}`)
  }

  /* Align */

  if (align) {
    classes.push(`l-align-${align}`)
  }

  /* Grow */

  if (grow) {
    classes.push('l-flex-grow-1')
  }

  /* Style */

  let styles = []

  if (style) {
    styles.push(style)
  }

  if (widthCustom) {
    classes.push('l-width-custom')

    const styleArray = [
      `--width:${widthCustom?.default ? widthCustom.default : '100%'}`,
      `--width-small:${widthCustom?.small ? widthCustom.small : '100%'}`,
      `--width-medium:${widthCustom?.medium ? widthCustom.medium : '100%'}`,
      `--width-large:${widthCustom?.large ? widthCustom.large : '100%'}`
    ]

    styles.push(styleArray.join(';'))
  }

  styles = styles.length ? ` style="${styles.join(';')}"` : ''

  /* Attributes */

  let attrs = ''

  if (attr) {
    attrs = ` ${attr}`
  }

  /* Output */

  return {
    start: `<${tag} class="${classes.join(' ')}"${styles}${attrs}>`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = column
