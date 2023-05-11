/**
 * Render - posts
 */

/* Imports */

import { enumLayouts } from '../../vars/enums'
import { archiveData, slugData } from '../../vars/data'
import { card, cards } from '../cards'
// const info = require('./info')

/**
 * Function - output posts
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.contentType
 * @param {number} props.args.display
 * @param {string} props.args.headingLevel
 * @param {string} props.args.layout
 * @param {boolean} props.args.nothingFound
 * @param {string} props.args.order
 * @return {string} - HTML
 */

interface Props {
  args: {
    contentType?: string;
    display?: number;
    headingLevel?: number;
    layout?: string;
    nothingFound?: boolean;
    order?: string;
  },
  parents?: object[];
}

const posts = (props : Props = { args: {} }): string => {
  const { args = {} } = props

  const {
    contentType = 'work',
    display = 1,
    headingLevel = 3,
    layout = 'cardsMinimal',
    nothingFound = true, // Display nothing found message
    order = 'date'
  } = args

  /* Type required */

  if (!contentType) {
    return ''
  }

  /* Layout */

  const l = enumLayouts[layout]

  /* Check posts */

  let posts = archiveData.posts?.[contentType] ? archiveData.posts[contentType] : []

  if (!posts.length) {
    return ''
    // return nothingFound ? info(`Looks like no ${slugData.bases[contentType].title.toLowerCase()} were found.`) : ''
  }

  /* Order */

  posts.sort((a: { date: Date }, b: { date: Date }) => {
    if (order === 'date' && a?.date && b?.date) {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)

      if (dateA > dateB) {
        return -1
      }
      if (dateA < dateB) {
        return 1
      }
    }
  
    return 0
  })

  /* Limit */

  if (display !== -1) {
    posts = posts.slice(0, display <= posts.length ? display : posts.length)
  }

  /* Items output */

  const outputArray: string[] = []

  posts.forEach((post: Render.InternalLink, index: number) => {
    let itemOutput = ''

    if (l.type === 'cards') {
      const cardOutput = card({
        args: {
          headingLevel,
          internalLink: post,
          type: l.subtype,
          index
        }
      })

      itemOutput = cardOutput.start + cardOutput.end
    }

    if (itemOutput) {
      outputArray.push(itemOutput)
    }
  })

  /* Container output */

  let output = outputArray.length ? outputArray.join('') : ''

  if (output && l.type === 'cards') {
    output = cards({
      args: {
        content: output,
        type: l.subtype,
        length: posts.length
      }
    })
  }

  return output
}

/* Exports */

export default posts
