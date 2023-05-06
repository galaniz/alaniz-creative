/**
 * Render - posts
 */

/* Imports */

const { enumLayouts } = require('../vars/enums')
const { archiveData, slugData } = require('../vars/data')
const { card, cards } = require('./cards')
// const info = require('./info')

/**
 * Function - output posts
 *
 * @param {object} args {
 *  @prop {string} contentType
 *  @prop {number} display
 *  @prop {string} headingLevel
 *  @prop {string} layout
 *  @prop {boolean} nothingFoundText
 *  @prop {string} order
 * }
 * @return {string} - HTML
 */

const posts = ({ args = {} }) => {
  let {
    contentType = 'work',
    display = 1,
    headingLevel = 3,
    layout = 'cardsMinimal',
    nothingFoundText = true, // Display nothing found message
    order = 'date'
  } = args

  /* Type required */

  if (!contentType) {
    return ''
  }

  /* Layout */

  layout = enumLayouts[layout]

  /* Check posts */

  let posts = archiveData.posts?.[contentType] ? archiveData.posts[contentType] : []

  if (!posts.length) {
    return ''
    // return nothingFoundText ? info(`Looks like no ${slugData.bases[contentType].title.toLowerCase()} were found.`) : ''
  }

  /* Order */

  posts.sort((a, b) => {
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

  let output = []

  posts.forEach((post, index) => {
    let itemOutput = ''

    if (layout.type === 'cards') {
      const cardOutput = card({
        args: {
          headingLevel,
          internalLink: post,
          type: layout.subtype,
          index
        }
      })

      itemOutput = cardOutput.start + cardOutput.end
    }

    if (itemOutput) {
      output.push(itemOutput)
    }
  })

  /* Container output */

  output = output.length ? output.join('') : ''

  if (output && layout.type === 'cards') {
    output = cards({
      args: {
        content: output,
        type: layout.subtype,
        length: posts.length
      }
    })
  }

  return output
}

/* Exports */

export default posts
