/**
 * Objects - Posts
 */

/* Imports */

import type { PostsProps } from './PostsTypes.js'
import type { Item } from '../../global/globalTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { getArchiveLabels } from '@alanizcreative/formation-static/utils/archive/archive.js'
import { CardMinimal, CardMinimalContainer } from '../Card/CardMinimal.js'
import { Card, CardContainer } from '../Card/Card.js'
import { Info } from '../Info/Info.js'

/**
 * Items by content type.
 *
 * @type {Object<string, Item[]>}
 */
const postsData: Record<string, Item[]> = {}

/**
 * Output posts.
 *
 * @param {PostsProps} props
 * @return {string} HTMLElement
 */
const Posts = (props: PostsProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args, itemData, parents } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    contentType: postType,
    headingLevel = 3,
    display = 1,
    layout = 'minimal'
  } = args

  let { order = 'date' } = args

  /* Page data */

  if (!isObjectStrict(itemData)) {
    return ''
  }

  const {
    id,
    contentType,
    taxonomy
  } = itemData

  /* Types */

  const isTaxonomy = contentType === 'taxonomy'
  const isTerm = contentType === 'term'

  /* Layouts */

  const isText = layout === 'text'
  const isCard = !isText

  /* Data */

  let posts: Item[] = []

  if (isStringStrict(postType)) {
    posts = postsData[postType] || []
  }

  if (isTaxonomy) {
    order = 'title'

    if (postsData.term) {
      posts = postsData.term.filter(item => {
        return item.taxonomy?.id === id
      })
    }
  }

  if (isTerm) {
    taxonomy?.contentTypes.forEach(type => {
      const newPosts = postsData[type]?.filter(post => post.category?.some(cat => cat.id === id))

      if (!newPosts) {
        return
      }

      posts = [
        ...posts,
        ...newPosts
      ]
    })
  }

  if (!posts.length) {
    return Info({
      type: 'neutral',
      text: `Looks like no ${getArchiveLabels(contentType || '', itemData).plural} were found.`
    })
  }

  /* Order */

  posts.sort((a, b) => {
    if (order === 'title' && a.title && b.title) {
      return a.title.localeCompare(b.title)
    }

    if (order === 'date' && a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }

    return 0
  })

  /* Limit */

  if (display > 1) {
    posts = posts.slice(0, display <= posts.length ? display : posts.length)
  }

  /* Total */

  const total = posts.length

  /* Items output */

  let output = ''

  posts.forEach((post, i) => {
    const {
      contentType: itemType,
      taxonomy: itemTaxonomy
    } = post

    if (isCard) {
      output += Card({
        args: {
          internalLink: post,
          headingLevel,
          type: layout,
          index: i,
          length: total
        },
        parents
      })
    }

    if (isText) {
      let cardText = ''

      if (itemType === 'term') {
        const termTaxonomyType = itemTaxonomy?.contentTypes[0] || ''
        const termPostsLabels = getArchiveLabels(termTaxonomyType, post)
        const termPostsTotal = postsData[termTaxonomyType]?.filter(termPost => {
          return termPost.category?.some(cat => cat.id === post.id)
        }).length || 0

        cardText =
          `${termPostsTotal} ${termPostsLabels[termPostsTotal === 1 ? 'singular' : 'plural'].toLowerCase()}`
      }

      output += CardMinimal(post, cardText)
    }
  })

  /* Container output */

  if (isText) {
    return CardMinimalContainer(output)
  }

  return CardContainer(output, layout)
}

/* Exports */

export {
  postsData,
  Posts
}
