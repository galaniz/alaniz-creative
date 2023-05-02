/**
 * Render - rich text
 */

/* Imports */

const { getLink } = require('../utils')

/**
 * Function - recursively output content
 *
 * @private
 * @param {object} args {
 *  @prop {array|string} content
 *  @prop {string} cardLink
 * }
 * @return {string}
 */

const _getContent = ({
  content = [],
  cardLink = '',
  _output = ''
}) => {
  content.forEach(c => {
    const {
      tag = '',
      link = '',
      content: con
    } = c

    let cc = con

    /* Nested content */

    if (Array.isArray(con)) {
      cc = _getContent({
        content: con,
        cardLink,
      })
    }

    const attr = []

    if (tag === 'ul' || tag === 'ol' || tag === 'li' || tag === 'blockquote' || tag === 'p' || tag === 'a') {
      attr.push('data-inline')
    }

    if (tag === 'th') {
      attr.push('scope="col"')
    }

    if (tag === 'a' && link) {
      attr.push(`href="${link}"`)
    }

    if (tag) {
      _output += `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>`
    }

    _output += cc

    if (tag) {
      _output += `</${tag}>`
    }
  })

  return _output
}

/**
 * Function - output rich text
 *
 * @param {object} args {
 *  @prop {string} tag
 *  @prop {string|array<object>} content
 *  @prop {string} classes
 *  @prop {string} textStyle
 *  @prop {string} headingStyle
 *  @prop {string} align
 *  @prop {string} link
 *  @prop {object} style
 * }
 * @param {array<object>} parents
 * @return {string}
 */

const richText = ({ args = {}, parents = [] }) => {
  let {
    tag = '',
    content = [],
    classes = '',
    textStyle = '',
    headingStyle = '',
    align = '',
    link = '',
    style
  } = args

  /* Hr */

  if (tag === 'hr') {
    return '<hr>'
  }

  /* Check if heading */

  const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)

  /* Check content and card parent */

  let cardLink = ''
  let card = false

  if (parents.length) {
    if (parents[0].renderType === 'card') {
      card = true
    }

    if (card && heading) {
      const {
        internalLink = false,
        externalLink = ''
      } = parents[0]

      cardLink = getLink(internalLink, externalLink)
    }
  }

  /* Classes */

  classes = classes ? [classes] : []

  if (card && tag === 'p') {
    classes.push('t-link-current')
  }

  if (textStyle && (tag === 'p' || tag === 'li' || tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'table')) {
    classes.push(textStyle)
  }

  if (tag === 'blockquote') {
    classes.push('t-quote')
  }

  if (headingStyle && heading) {
    classes.push(headingStyle)
  }

  if (align) {
    classes.push(`t-align-${align}`)
  }

  classes = classes.join(' ')

  /* Generate output */

  let output = ''

  if (Array.isArray(content)) {
    output = _getContent({
      content,
      cardLink
    })
  } else {
    output = content
  }

  /* Attributes */

  const attr = []

  if (heading) {
    attr.push(`id="${output.replace(/[\s,:;"'“”‘’]/g, '-').toLowerCase()}"`)
  }

  if (tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'p' || tag === 'a') {
    attr.push('data-inline')
  }

  if (tag === 'a' && link) {
    attr.push(`href="${link}"`)
  }

  if (classes) {
    attr.push(`class="${classes}"`)
  }

  if (style) {
    const styleArray = []
    
    Object.keys(style).forEach((s) => {
      styleArray.push(`${s}:${style[s]}`)
    })

    attr.push(`style="${styleArray.join(';')}"`)
  }

  /* Card */

  if (cardLink) {
    output = `<a class="l-before outline-tight" href="${cardLink}" data-inline>${content}</a>`
  }

  /* Output */

  if (tag) {
    output = `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>${output}</${tag}>`
  }

  return output
}

/* Exports */

module.exports = richText
