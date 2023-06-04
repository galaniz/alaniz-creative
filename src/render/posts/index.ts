/**
 * Render - posts
 */

/* Imports */

import { enumLayouts } from '../../vars/enums'
import { slugData, archiveData } from '../../vars/data'
import { card, cards } from '../cards'
import { listMinimalItem, listMinimal } from '../list-minimal'
import info from '../info'

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
    contentType?: string
    display?: number
    headingLevel?: number
    layout?: string
    nothingFound?: boolean
    order?: string
    id?: string
  }
  parents?: object[]
}

const posts = (props: Props = { args: {} }): string => {
  const { args = {} } = props

  const {
    contentType = 'work',
    display = 1,
    headingLevel = 3,
    layout = 'cardsMinimal',
    nothingFound = true, // Display nothing found message
    order = 'date',
    id = ''
  } = args

  /* Type required */

  if (contentType === '') {
    return ''
  }

  /* Content type title */

  const typeTitle: string = slugData.bases[contentType].title.toLowerCase()

  /* Id required if term */

  if (contentType === 'workCategory' && id === '') {
    return info(`Looks like no ${typeTitle} were found.`)
  }

  /* Layout */

  const l = enumLayouts[layout]

  /* Check posts */

  let posts = archiveData.posts?.[contentType] !== undefined ? archiveData.posts[contentType] : []

  if (contentType === 'workCategory') {
    posts = posts[id]
  }

  if (posts.length === 0) {
    return nothingFound ? info(`Looks like no ${typeTitle} were found.`) : ''
  }

  /* Order */

  posts.sort((a: { date: Date }, b: { date: Date }) => {
    if (order === 'date' && a?.date !== undefined && b?.date !== undefined) {
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

    if (l.type === 'listMinimal') {
      const itemArgs = { ...post }

      itemArgs.contentType = contentType

      if (contentType === 'workCategory') {
        const length: number = archiveData.posts[contentType][post.id].length

        itemArgs.text = `${length} work item${length === 1 ? '' : 's'}`
      }

      itemOutput = listMinimalItem({
        args: itemArgs
      })
    }

    if (itemOutput !== '') {
      outputArray.push(itemOutput)
    }
  })

  /* Container output */

  let output = (outputArray.length > 0) ? outputArray.join('') : ''

  if (output !== '' && l.type === 'cards') {
    output = cards({
      args: {
        content: output,
        type: l.subtype,
        length: posts.length
      }
    })
  }

  if (output !== '' && l.type === 'listMinimal') {
    output = listMinimal({
      args: {
        content: output
      }
    })
  }

  return output
}

/* Exports */

export default posts
