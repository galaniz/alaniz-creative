/**
 * Render - container
 */

/**
 * Function - output container wrapper
 *
 * @param {object} args {
 *  @prop {string} tag
 *  @prop {string} layout
 *  @prop {string} maxWidth
 *  @prop {string} paddingTop
 *  @prop {string} paddingTopLarge
 *  @prop {string} paddingBottom
 *  @prop {string} paddingBottomLarge
 *  @prop {string} gap
 *  @prop {string} gapLarge
 *  @prop {string} justify
 *  @prop {string} align
 *  @prop {string} classes
 *  @prop {string} richTextStyles
 * }
 * @return {object}
 */

const container = ({ args = {} }) => {
  const {
    tag = 'div',
    layout = 'column',
    maxWidth = '',
    paddingTop = '',
    paddingTopLarge = '',
    paddingBottom = '',
    paddingBottomLarge = '',
    gap = '',
    gapLarge = '',
    justify = '',
    align = '',
    richTextStyles = false
  } = args

  let { classes = '' } = args

  /* Classes */

  classes = classes ? [classes] : []

  /* Attributes */

  const attr = []

  /* List check */

  if (tag === 'ul' || tag === 'ol') {
    attr.push('role="list"')
    classes.push('t-list-style-none')
  }

  /* Max width */

  if (maxWidth) {
    classes.push(`l-container${maxWidth !== 'default' ? `-${maxWidth}` : ''}`)
  }

  /* Flex */

  if (layout === 'column' && (justify || align)) {
    classes.push('l-flex l-flex-column')
  }

  if (layout === 'row') {
    classes.push('l-flex l-flex-wrap')
  }

  /* Gap */

  if (gap) {
    if (layout === 'row') {
      classes.push(`l-gap-margin-${gap}`)
    } else {
      classes.push(`l-margin-bottom-${gap}-all`)
    }
  }

  if (gapLarge && gapLarge !== gap) {
    if (layout === 'row') {
      classes.push(`l-gap-margin-${gapLarge}-l`)
    } else {
      classes.push(`l-margin-bottom-${gapLarge}-all-l`)
    }
  }

  /* Justify */

  if (justify) {
    classes.push(`l-justify-${justify}`)
  }

  /* Align */

  if (align) {
    classes.push(`l-align-${align}`)
  }

  /* Padding */

  if (paddingTop) {
    classes.push(`l-padding-top-${paddingTop}`)
  }

  if (paddingTopLarge && paddingTopLarge !== paddingTop) {
    classes.push(`l-padding-top-${paddingTopLarge}-m`)
  }

  if (paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottom}`)
  }

  if (paddingBottomLarge && paddingBottomLarge !== paddingBottom) {
    classes.push(`l-padding-bottom-${paddingBottomLarge}-m`)
  }

  /* Rich text styles */

  if (richTextStyles) {
    classes.push('t-rich-text e-underline')
  }

  /* Classes */

  if (classes.length) {
    attr.push(`class="${classes.join(' ')}"`)
  }

  /* Output */

  return {
    start: `<${tag}${attr ? ` ${attr.join(' ')}` : ''}>`,
    end: `</${tag}>`
  }
}

/* Exports */

module.exports = container
