/**
 * Render - protect
 */

/* Imports */

const layout = require('./layout')
const container = require('./container')
const form = require('./form')
const field = require('./field')

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
      title: title,
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