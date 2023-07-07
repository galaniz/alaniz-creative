/**
 * Components - http error
 */

/* Imports */

import getPermalink from '@alanizcreative/static-site-formation/src/utils/get-permalink'
import container from '@alanizcreative/static-site-formation/src/layouts/container'
import config from '../../config'
import layout from '../layout'
import header from '../header'
import footer from '../footer'
import navigations from '../navigations'
import button from '../../objects/button'

/**
 * Function - output http error page (404 or 500)
 *
 * @param {number} type - 404 or 500
 * @return {string} HTML - html
 */

const httpError = async (type: number = 404): Promise<string> => {
  /* Text by type */

  const text = {
    404: {
      metaTitle: 'Page Not Found',
      heroText: 'Looks like nothing was found in this location.'
    },
    500: {
      metaTitle: 'Internal Server Error',
      heroText: 'Looks like we\'re experiencing an internal server problem.'
    }
  }

  const title: string = text[type].metaTitle
  const heroText: string = text[type].heroText

  /* Navigations */

  const navs = navigations({
    navigations: config.navigation,
    items: config.navigationItem,
    current: getPermalink(`${type}`)
  })

  /* Container and button */

  const output = {
    container: container({
      args: {
        maxWidth: 'xs',
        paddingTop: 'xl',
        paddingTopLarge: '2xl',
        paddingBottom: 'l',
        classes: 't-align-center'
      }
    }),
    button: button({
      args: {
        title: 'Homepage',
        type: 'secondary',
        iconBefore: 'arrow',
        internalLink: {
          id: 'page--index',
          contentType: 'page',
          slug: 'index'
        }
      }
    })
  }

  /* Output */

  return await layout({
    meta: {
      title,
      noIndex: true
    },
    content: `
      ${header(navs)}
      <main id="main">
        ${output.container.start}
          <h1>${type}</h1>
          <p class="t l-padding-top-m l-padding-bottom-l">${heroText}</p>
          ${output.button}
        ${output.container.end}
      </main>
      ${footer(navs)}
    `
  })
}

/* Exports */

export default httpError
