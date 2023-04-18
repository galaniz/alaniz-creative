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
 *  @prop {string} outerTag
 * }
 * @return {string}
 */

const _getContent = ({
  content = [],
  cardLink = '',
  outerTag = '',
  _output = ''
}) => {
  content.forEach(c => {
    const {
      tag = 'p',
      content: con
    } = c

    /* Nested content */

    if (Array.isArray(con)) {
      const inner = _getContent({
        content: con,
        cardLink,
        outerTag
      })

      if (tag && inner) {
        if ((outerTag === 'ul' || outerTag === 'ol' || outerTag === 'table') && tag === 'p') {
          _output += inner
        } else {
          const attr = []

          if (tag === 'ul' || tag === 'ol' || tag === 'li' || tag === 'blockquote' || tag === 'p') {
            attr.push('data-inline')
          }

          if (tag === 'th') {
            attr.push('scope="col"')
          }

          _output += `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>${inner}</${tag}>`
        }
      }
    } else {
      _output += `<${tag}>${con}</${tag}>`
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
 * }
 * @param {array<object>} parents
 * @return {string}
 */

const richText = ({ args = {}, parents = [] }) => {
  let {
    tag = 'p',
    content = [],
    classes = '',
    textStyle,
    headingStyle
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
    /*if (parents[1].renderType === 'card') {
      card = true
    }

    if (card && heading) {
      const {
        internalLink = false,
        externalLink = '',
        embed
      } = parents[1]

      if (!embed) {
        cardLink = getLink(internalLink, externalLink)
      }
    }*/
  }

  /* Classes */

  classes = classes ? [classes] : []

  if (card && tag === 'p') {
    classes.push('t-link-current')
  }

  if (textStyle && (tag === 'p' || tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'table')) {
    classes.push(textStyle)
  }

  if (headingStyle && heading) {
    classes.push(`t-${headingStyle}`)
  }

  classes = classes.join(' ')

  /* Generate output */

  let output = ''

  if (Array.isArray(content)) {
    output = _getContent({
      content,
      cardLink,
      outerTag: tag
    })
  } else {
    output = content
  }

  /* Attributes */

  const attr = []

  if (heading) {
    attr.push(`id="${output.replace(/[\s,:;"'“”‘’]/g, '-').toLowerCase()}"`)
  }

  if (tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'p') {
    attr.push('data-inline')
  }

  if (classes) {
    attr.push(`class="${classes}"`)
  }

  /* Output */

  output = tag && output ? `<${tag}${attr.length ? ` ${attr.join(' ')}` : ''}>${output}</${tag}>` : ''

  return output
}

/* Exports */

module.exports = richText
