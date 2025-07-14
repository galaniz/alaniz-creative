/**
 * Render - protect
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import layout from '../layout'
import container from '../container'
import form from '../form'
import field from '../field'
import lockSvg from '../../svg/Lock/Lock'

/**
 * Function - output password protected page
 *
 * @return {string} HTML - html
 */

const protect = async (): Promise<string> => {
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
        paddingBottom: '3xl',
        classes: 'w-full'
      }
    }),
    form: form({
      args: {
        id: uuid(),
        action: 'check-password',
        submitLabel: 'Go',
        row: 's',
        align: 's'
      }
    }),
    field: field({
      args: {
        type: 'password',
        name: 'password',
        label: 'Password',
        required: true,
        emptyErrorMessage: 'Enter a password',
        width: '3-4',
        widthBreakpoint: 's',
        grow: true
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
      <main id="main" class="flex l-align-center l-min-height-100-vh">
        ${output.container.start}
          <div class="flex w-l h-l w-xl-m h-xl-m b-radius-full bg-muted sharp">
            ${lockSvg('w-m h-m w-l-m h-l-m m-auto')}
          </div>
          <h1 class="pt-m">${title}</h1>
          <p class="text-l lead-open pt-xs pb-m pb-l-m">${text}</p>
          ${output.form.start}
            ${output.field}
          ${output.form.end}
        ${output.container.end}
      </main>
    `
  })
}

/* Exports */

export default protect
