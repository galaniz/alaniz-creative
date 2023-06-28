/**
 * Render - list minimal
 */

/* Imports */

import container from '../container'
import richText from '../rich-text'

/**
 * Function - output list container
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.content
 * @return {string} HTML - li
 */

interface ListMinimalItemProps {
  args: {
    id?: string
    title?: string
    slug?: string
    contentType?: string
    text?: string
  }
}

const listMinimalItem = (props: ListMinimalItemProps = { args: {} }): string => {
  const { args = {} } = props

  const {
    id = '',
    title = '',
    slug = '',
    contentType = '',
    text = ''
  } = args

  /* Title, slug and content type required */

  if (id === '' || title === '' || slug === '' || contentType === '') {
    return ''
  }

  /* Parents */

  const parents = [
    {
      renderType: 'card',
      internalLink: {
        id,
        contentType,
        slug
      }
    }
  ]

  /* Content */

  let content = richText({
    args: {
      tag: 'h2',
      content: title,
      classes: 'l-inline-block l-relative'
    },
    parents
  })

  if (text !== '') {
    content += richText({
      args: {
        tag: 'p',
        content: text,
        textStyle: 's',
        classes: 'l-padding-top-2xs'
      }
    })
  }

  /* Output */

  const containerArgs: Render.ContainerProps = {
    args: {
      tag: 'li'
    }
  }

  const itemContainer = container(containerArgs)

  return (
    itemContainer.start +
    content +
    itemContainer.end
  )
}

/**
 * Function - output list container
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.content
 * @return {string} HTML - ul
 */

interface ListMinimalProps {
  args: {
    content?: string
  }
}

const listMinimal = (props: ListMinimalProps = { args: {} }): string => {
  const { args = {} } = props
  const { content = '' } = args

  /* Content required */

  if (content === '') {
    return ''
  }

  /* Output */

  const containerArgs: Render.ContainerProps = {
    args: {
      tag: 'ul',
      gap: 'm',
      gapLarge: 'l',
      classes: 'e-underline'
    }
  }

  const listContainer = container(containerArgs)

  return (
    listContainer.start +
    content +
    listContainer.end
  )
}

/* Exports */

export { listMinimalItem, listMinimal }
