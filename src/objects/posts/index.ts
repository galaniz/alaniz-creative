/**
 * Objects - posts
 */

/* Imports */

import config from '../../config'
import info from '../info'
import { card, cards } from '../cards'
import { listMinimalItem, listMinimal } from '../list-minimal'

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
 * @param {string} props.args.taxonomy
 * @param {string} props.args.termId
 * @return {string} - HTML
 */

interface PostsProps {
  args: {
    contentType?: string
    display?: number
    headingLevel?: number
    layout?: string
    nothingFound?: boolean
    order?: string
    taxonomy?: string
    termId?: string
  }
  parents?: object[]
}

const posts = (props: PostsProps = { args: {} }): string => {
  const { args = {} } = props

  const {
    contentType = '',
    display = 1,
    headingLevel = 3,
    layout = 'cardsMinimal',
    nothingFound = true, // Display nothing found message
    order = 'date',
    taxonomy = '',
    termId = ''
  } = args

  /* Type required */

  if (contentType === '') {
    return ''
  }

  /* Taxonomy check */

  const isTaxonomy = config.taxonomy?.[taxonomy] !== undefined && termId === ''

  /* Term check */

  const isTerm = config.taxonomy?.[taxonomy] !== undefined && termId !== ''

  /* Type */

  const type = isTaxonomy ? taxonomy : contentType

  /* Content type title */

  const typeTitle: string = config.slug.bases[type].title.toLowerCase()
  const typeSingular: string = config.slug.bases[contentType].title.toLowerCase()

  if (isTerm) {
    console.log('POSTS', contentType, typeTitle, typeSingular)
  }

  /* Layout */

  const l = config.layouts[layout]

  /* Check posts */

  let posts = config.archive.posts?.[type] !== undefined ? config.archive.posts[type] : []

  if (isTerm) {
    posts = []
    // posts = config.archive.terms?.[taxonomy]?.[contentType]?.[termId] !== undefined ? config.archive.terms[taxonomy][contentType][termId] : []
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

  posts.forEach((post: AC.InternalLink, index: number) => {
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

      itemOutput = `${cardOutput.start}${cardOutput.end}`
    }

    if (l.type === 'listMinimal') {
      const itemArgs = { ...post }

      itemArgs.contentType = type

      if (isTaxonomy) {
        const length: number = config.archive.terms[taxonomy][contentType][post.id].length

        itemArgs.text = `${length} ${typeSingular} item${length === 1 ? '' : 's'}`
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
