/**
 * Render - card
 */

/* Imports */

import { enumBlobs } from '../../vars/enums'
import container from '../container'
import column from '../column'
import richText from '../rich-text'
import image from '../image'

/**
 * Function - output card content
 *
 * @private
 * @param {object} args
 * @param {object} args.internalLink
 * @param {number} args.headingLevel
 * @param {string} args.type
 * @param {number} args.index
 * @return {string} - HTML
 */

interface _CardProps {
  internalLink: Render.InternalLink
  headingLevel: number
  type: string
  index: number
}

const _card = ({ internalLink, headingLevel, type, index }: _CardProps): string => {
  const {
    title = '',
    slug = '',
    hero
  } = internalLink

  /* Title, image and slug required */

  if (title === '' || hero === undefined || slug === '') {
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

  let headingStyle = 'h4'
  let subText = ''
  let textClasses = ''

  if (ac) {
    headingStyle = 'h2'
    textClasses = `l-padding-top-m l-padding-top-l-m ${index % 2 !== 0 ? 'l-margin-right-auto' : 'l-margin-left-auto'}`
  } else {
    textClasses = ' l-padding-top-2xs l-padding-top-m-m'
  }

  const heading = richText({
    args: {
      tag: `h${headingLevel}`,
      headingStyle,
      content: title,
      classes: 't-theme-main'
    },
    parents
  })

  if (internalLink.contentType === 'work' && internalLink?.category !== undefined) {
    subText = richText({
      args: {
        tag: 'p',
        textStyle: 'xs',
        classes: 'l-padding-top-3xs',
        content: '<span class="a11y-visually-hidden">Categories: </span>' + internalLink.category.map((cat) => {
          return cat.title
        }).join(' + ')
      }
    })
  }

  const text = `
    <div${textClasses !== '' ? ` class="${textClasses}"` : ''} data-text>
      ${heading}
      ${subText}
    </div>
  `

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
 * @param {object} props
 * @param {object} props.args
 * @param {number} props.args.headingLevel
 * @param {string} props.args.type
 * @param {object} props.args.internalLink
 * @param {number} props.args.index
 * @return {object}
 */

interface CardProps {
  args: {
    headingLevel?: number
    type?: string
    internalLink?: Render.InternalLink
    index?: number
  }
  parents?: object[]
}

const card = (props: CardProps = { args: {} }): Render.Return => {
  const { args = {} } = props

  const {
    headingLevel = 3,
    type = 'minimal',
    internalLink,
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

  if (internalLink !== undefined) {
    const { svg, theme } = internalLink

    /* Blob svg */

    if (ac && svg?.blob !== undefined) {
      const reverse = index % 2 !== 0
      const path: string = enumBlobs[svg.blob].path

      blob = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 800"
          aria-hidden="true"
          focusable="false"
          role="img"
          class="o-blob l-absolute l-top-0 l-left-0 l-right-0 l-margin-auto"
          data-reverse="${reverse.toString()}"
        >
          <path
            d="${path}"
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

    if (theme !== undefined) {
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

  const columnArgs: Render.ColumnProps = {
    args: {
      tag: 'li'
    }
  }

  if (type === 'minimal') {
    columnArgs.args.widthSmall = '1-2'
  }

  if (ac) {
    columnArgs.args.attr = `data-type="${type.charAt(0)}"`
    columnArgs.args.classes = 'o-card l-relative l-padding-top-xl l-padding-bottom-xl l-padding-top-3xl-m l-padding-bottom-3xl-m'
  }

  if (themeColor !== '') {
    columnArgs.args.style = `--theme-main:${themeColor}`
  }

  const cardColumn = column(columnArgs)

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
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.content
 * @param {string} props.args.type
 * @param {string} props.args.length
 * @return {string} HTML - ul
 */

interface CardsProps {
  args: {
    content?: string
    type?: string
    length?: number
  }
}

const cards = (props: CardsProps = { args: {} }): string => {
  const { args = {} } = props

  const {
    content = '',
    type = 'minimal',
    length = 0
  } = args

  const containerArgs: Render.ContainerProps = {
    args: {
      tag: 'ul'
    }
  }

  if (type === 'minimal') {
    containerArgs.args.layout = 'row'
    containerArgs.args.gap = 'm'
    containerArgs.args.gapLarge = 'l'
  }

  if (type === 'cascading') {
    const widow = length % 3 === 2

    containerArgs.args.layout = 'row'
    containerArgs.args.attr = `data-widow="${widow.toString()}"`
  }

  const cardsContainer = container(containerArgs)

  return (
    cardsContainer.start +
    content +
    cardsContainer.end
  )
}

/* Exports */

export { card, cards }
