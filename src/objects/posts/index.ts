/**
 * Objects - posts
 */

/* Imports */

import getArchiveLabels from '@alanizcreative/static-site-formation/lib/utils/get-archive-labels'
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
 * @param {array<string>} props.args.linkContentType
 * @param {number} props.args.display
 * @param {string} props.args.headingLevel
 * @param {string} props.args.layout
 * @param {boolean} props.args.nothingFound
 * @param {string} props.args.order
 * @param {string} props.args.termId
 * @return {string} - HTML
 */

interface PostsProps {
  args: {
    contentType?: string
    linkContentType?: string[]
    display?: number
    headingLevel?: number
    layout?: string
    nothingFound?: boolean
    order?: string
    termId?: string
  }
  parents?: FRM.ParentArgs[]
}

const posts = (props: PostsProps = { args: {} }): string => {
  const { args = {} } = props

  const {
    contentType = '',
    linkContentType = [],
    display = 1,
    headingLevel = 3,
    layout = 'cardsMinimal',
    nothingFound = true, // Display nothing found message
    order = 'date',
    termId = ''
  } = args

  /* Type required */

  if (contentType === '') {
    return ''
  }

  /* Taxonomy check */

  const isTaxonomy = config.contentTypes.taxonomy?.[contentType] !== undefined && termId === ''

  /* Term check */

  const isTerm = config.contentTypes.taxonomy?.[contentType] !== undefined && termId !== ''

  /* Content type labels */

  const labels = getArchiveLabels(contentType, linkContentType, isTerm)

  const { plural } = labels

  /* Layout */

  const l = config.vars.layouts[layout]

  /* Check posts */

  let posts = config.archive.posts?.[contentType] !== undefined ? config.archive.posts[contentType] : []

  if (isTaxonomy) {
    posts = posts.filter((post: AC.InternalLink) => {
      const postLinkContentType = post?.linkContentType !== undefined ? post.linkContentType : ''

      return linkContentType.includes(postLinkContentType)
    })
  }

  if (isTerm) {
    posts = []

    linkContentType.forEach((c: string) => {
      const termPosts = config.archive.terms?.[contentType]?.[c]?.[termId]

      if (Array.isArray(termPosts)) {
        posts = [...posts, ...termPosts]
      }
    })
  }

  if (posts.length === 0) {
    return nothingFound ? info(`Looks like no ${plural} were found.`) : ''
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

      if (isTaxonomy) {
        let length = 0

        let {
          contentType: postContentType,
          linkContentType: postLinkContentType,
          id: postId
        } = post

        postLinkContentType = postLinkContentType === undefined ? '' : postLinkContentType

        const postLabels = getArchiveLabels(postContentType, postLinkContentType, true)

        const {
          singular: postSingular,
          plural: postPlural
        } = postLabels

        let postLinkContentTypeArray: string[] = []

        if (postLinkContentType === 'default' || postLinkContentType === '') {
          postLinkContentTypeArray = config.contentTypes.taxonomy[postContentType].contentTypes
        } else {
          postLinkContentTypeArray = [postLinkContentType]
        }

        postLinkContentTypeArray.forEach((c) => {
          const termPosts = config.archive.terms?.[contentType]?.[c]?.[postId]

          if (Array.isArray(termPosts)) {
            length += termPosts.length
          }
        })

        itemArgs.text = `${length} ${length === 1 ? postSingular : postPlural}`
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
