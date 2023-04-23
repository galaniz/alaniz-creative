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
    classes = '' // Back end option
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

  /* Attr */

  const attr = []

  if (widthCustom) {
    classes.push('l-width-custom')

    const styleArray = [
      `--width:${widthCustom?.default ? widthCustom.default : '100%'}`,
      `--widthSmall:${widthCustom?.small ? widthCustom.small : '100%'}`,
      `--widthMedium:${widthCustom?.medium ? widthCustom.medium : '100%'}`,
      `--widthLarge:${widthCustom?.large ? widthCustom.large : '100%'}`
    ]

    attr.push(` style=${styleArray.join(';')}`)
  }

  /* Output */

  return {
    start: `<${tag} class="${classes.join(' ')}"${attr.join(' ')}>`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = column
