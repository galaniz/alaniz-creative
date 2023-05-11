/**
 * Render - rich text
 */

/* Imports */

import { getLink } from '../../utils'

/**
 * Function - recursively output content
 *
 * @private
 * @param {object} args
 * @param {array|string} args.content
 * @param {string} args.cardLink
 * @return {string}
 */

interface _ContentProps {
  content: {
    tag?: string;
    link?: string;
    content?: string | object[]
  }[];
  cardLink?: string;
  _output?: string;
}

const _getContent = ({
  content = [],
  cardLink = '',
  _output = ''
}: _ContentProps): string => {
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

    const attr: string[] = []

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
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.tag
 * @param {string|array<object>} props.args.content
 * @param {string} props.args.classes
 * @param {string} props.args.textStyle
 * @param {string} props.args.headingStyle
 * @param {string} props.args.align
 * @param {string} props.args.link
 * @param {object} props.args.style
 * @param {array<object>} props.parents
 * @return {string}
 */

interface RichTextProps {
  args: {
    tag?: string;
    content?: string | object[];
    classes?: string;
    textStyle?: string;
    headingStyle?: string;
    align?: string;
    link?: string;
    style?: object;
  }
  parents?: {
    renderType: string;
    internalLink?: Render.InternalLink;
    externalLink?: string;
  }[]
}

const richText = (props : RichTextProps = { args: {}, parents: [] }): string => {
  const { args = {}, parents = [] } = props

  const {
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
        internalLink,
        externalLink = ''
      } = parents[0]

      cardLink = getLink(internalLink, externalLink)
    }
  }

  /* Classes */

  const classesArray: string[] = []

  if (classes) {
    classesArray.push(classes)
  }

  if (card && tag === 'p') {
    classesArray.push('t-link-current')
  }

  if (textStyle && (tag === 'p' || tag === 'li' || tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'table')) {
    classesArray.push(textStyle)
  }

  if (tag === 'blockquote') {
    classesArray.push('t-quote')
  }

  if (headingStyle && heading) {
    classesArray.push(headingStyle)
  }

  if (align) {
    classesArray.push(`t-align-${align}`)
  }

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

  const attr: string[] = []

  if (heading) {
    attr.push(`id="${output.replace(/[\s,:;"'“”‘’]/g, '-').toLowerCase()}"`)
  }

  if (tag === 'ul' || tag === 'ol' || tag === 'blockquote' || tag === 'p' || tag === 'a') {
    attr.push('data-inline')
  }

  if (tag === 'a' && link) {
    attr.push(`href="${link}"`)
  }

  if (classesArray.length) {
    attr.push(`class="${classesArray.join(' ')}"`)
  }

  if (style) {
    const styleArray: string[] = []
    
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

export default richText
