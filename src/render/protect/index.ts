/**
 * Render - protect
 */

/* Imports */

import layout from '../layout'
import container from '../container'
import form from '../form'
import field from '../field'

/**
 * Function - output password protected page
 *
 * @return {string} HTML - html
 */

const protect = async () => {
  /* Title */

  const title = 'This content is protected'

  /* Text */

  const text = 'To view, please enter the password.'

  /* Container and form */

  const output = {
    container: container({
      args: {
        maxWidth: 'xs',
        paddingTop: '2xl',
        paddingBottom: '3xl'
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
      <main id="main">
        ${output.container.start}
          <h1 class="l-padding-top-m">${title}</h1>
          <p class="t-l l-padding-top-xs">${text}</p>
        ${output.container.end}
      </main>
    `
  })
}

/* Exports */

export default protect
