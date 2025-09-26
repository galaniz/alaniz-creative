/**
 * Components - Http Error
 */

/* Imports */

import type { RenderHttpError } from '@alanizcreative/formation-static/render/renderTypes.js'
import { renderInlineItem } from '@alanizcreative/formation-static/render/renderInline.js'
import { Hero } from '../Hero/Hero.js'

/**
 * Output http error.
 *
 * @type {RenderHttpError}
 */
const HttpError: RenderHttpError = async (args) => {
  const { code } = args

  let metaTitle = 'Page Not Found'
  let title = 'Page Not Found'
  let text = 'Looks like nothing was found in this location.'

  if (code === 500) {
    metaTitle = 'Internal Server Error'
    title = 'Internal Server Error'
    text = 'Looks like we\'re experiencing an internal server problem.'
  }

  const contentType = 'page'
  const slug = `${code}${code === 404 ? '.html' : ''}`
  const id = `http-error-${code}`

  return await renderInlineItem({
    id,
    slug,
    contentType,
    title: metaTitle,
    content: Hero({
      contentType,
      title,
      text,
      type: 'error',
      action: {
        title: 'Homepage',
        type: 'secondary',
        icon: 'arrow',
        internalLink: {
          id: 'page--index',
          contentType: 'page',
          slug: 'index'
        }
      }
    })
  })
}

/* Exports */

export { HttpError }
