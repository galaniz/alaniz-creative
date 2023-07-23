/**
 * Components - http error
 */

/* Imports */

import getPermalink from '@alanizcreative/static-site-formation/lib/utils/get-permalink'
import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import config from '../../config'
import layout from '../layout'
import navigations from '../navigations'
import button from '../../objects/button'

/**
 * Function - output http error page (404 or 500)
 *
 * @param {number} type - 404 or 500
 * @return {string} HTML - html
 */

interface HttpErrorText {
  [key: number]: {
    metaTitle: string
    heroText: string
  }
}

const httpError = async (type: number = 404): Promise<string> => {
  /* Text by type */

  const text: HttpErrorText = {
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
      description: '',
      url: '',
      image: '',
      canonical: '',
      prev: '',
      next: '',
      noIndex: true,
      isIndex: false
    },
    navigations: navs,
    content: `
      ${output.container.start}
        <h1>${type}</h1>
        <p class="t l-padding-top-m l-padding-bottom-l">${heroText}</p>
        ${output.button}
      ${output.container.end}
    `
  })
}

/* Exports */

export default httpError
