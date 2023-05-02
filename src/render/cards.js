/**
 * Render - card
 */

/* Imports */

const container = require('./container')
const column = require('./column')
const richText = require('./rich-text')
const image = require('./image')

/**
 * Function - output card content
 *
 * @private
 * @param {object} args {
 *  @prop {object} internalLink
 *  @prop {string} headingLevel
 *  @prop {string} type
 *  @prop {number} index
 * }
 * @return {string} - HTML
 */

const _card = ({ internalLink, headingLevel, type, index }) => {
  const {
    title,
    slug,
    hero
  } = internalLink

  /* Title, image and slug required */

  if (!title || !hero || !slug) {
    return ''
  }

  /* Alternating or cascading */

  const ac = type === 'alternating' || type === 'cascading'

  /* Parents */

  const parents = [
    {
      renderType: 'card',
      internalLink
    }
  ]

  /* Text */

  let headingStyle = 't-h4'
  let textClasses = ''

  if (ac) {
    headingStyle = 't-h2'
    textClasses = `l-padding-top-m l-padding-top-l-m ${index % 2 ? 'l-margin-right-auto' : 'l-margin-left-auto'}`
  } else {
    textClasses = ' l-padding-top-2xs l-padding-top-m-m'
  }

  const heading = richText({
    args: {
      tag: `h${headingLevel}`,
      headingStyle,
      content: title
    },
    parents
  })

  const text = `<div${textClasses ? ` class="${textClasses}"` : ''} data-text>${heading}</div>`

  /* Image */

  const media = image({
    args: {
      image: hero.image,
      border: hero.border
    },
    parents
  })

  /* Output */

  return text + media
}

/**
 * Function - output card container
 *
 * @param {object} args {
 *  @prop {number} headingLevel
 *  @prop {string} type
 *  @prop {object} internalLink
 *  @prop {number} index
 * }
 * @return {string} HTML - li|div
 */

const card = ({ args = {} }) => {
  let {
    headingLevel = 3,
    type = 'minimal',
    internalLink = false,
    index = 0
  } = args

  /* Alternating or cascading */

  const ac = type === 'alternating' || type === 'cascading'

  /* Classes */

  let classes = 'l-flex l-flex-column'

  /* Type classes */

  if (ac) {
    classes += ' l-align-center'
  }

  /* Inner content */

  let content = ''
  let blob = ''
  let themeColor = ''

  if (internalLink) {
    const { svg = {}, theme = {} } = internalLink

    /* Blob svg */

    if (ac && svg?.blob) {
      blob = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 800"
          aria-hidden="true"
          focusable="false"
          role="img"
          class="o-blob l-absolute l-top-0 l-left-0 l-right-0 l-margin-auto"
          data-reverse="${index % 2 ? true : false}"
        >
          <path
            d="${svg.blob.path}"
            fill="none"
            stroke="var(--theme-main)"
            stroke-opacity="0.5"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      `
    }

    /* Theme color */

    if (theme) {
      themeColor = theme.main.dark
    }

    /* Card content */

    content = _card({
      internalLink,
      headingLevel,
      type,
      index
    })
  }

  /* Column */

  const columnArgs = {
    tag: 'li',
  }

  if (type === 'minimal') {
    columnArgs.widthSmall = '1-2'
  }

  if (ac) {
    columnArgs.attr = `data-type="${type.charAt(0)}"`
    columnArgs.classes = 'o-card l-relative l-padding-top-xl l-padding-bottom-xl l-padding-top-3xl-m l-padding-bottom-3xl-m'
  }

  if (themeColor) {
    columnArgs.style = `--theme-main:${themeColor}`
  }

  const cardColumn = column({
    args: columnArgs
  })

  /* Output */

  return {
    start: `
      ${cardColumn.start}
      ${blob}
      <div class="l-relative l-overflow-hidden e-transition-quad e-translate e-scale">
        <div class="${classes}">${content}
    `,
    end: `
        </div>
      </div>
      ${cardColumn.end}
    `
  }
}

/**
 * Function - output cards container
 *
 * @param {object} args {
 *  @prop {string} content
 *  @prop {string} type
 *  @prop {string} length
 * }
 * @return {string} HTML - ul
 */

const cards = ({ args = {} }) => {
  const {
    content = '',
    type = 'minimal',
    length = 0
  } = args

  let containerArgs = {
    tag: 'ul'
  }

  if (type === 'minimal') {
    containerArgs.layout = 'row'
    containerArgs.gap = 'm'
    containerArgs.gapLarge = 'l'
  }

  if (type === 'cascading') {
    containerArgs.layout = 'row'
    containerArgs.attr = `data-widow="${length % 3 === 2 ? true : false}"`
  }

  const cardsContainer = container({ args: containerArgs })

  return (
    cardsContainer.start +
    content +
    cardsContainer.end
  )
}

/* Exports */

module.exports = { card, cards }
