/**
 * Components - protect
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import container from '@alanizcreative/static-site-formation/lib/layouts/container'
import form from '@alanizcreative/static-site-formation/lib/objects/form'
import field from '@alanizcreative/static-site-formation/lib/objects/field'
import layout from '../../components/layout'
import lockSvg from '../../svg/lock'

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
        classes: 'l-width-1-1'
      }
    }),
    form: form({
      args: {
        id: uuid(),
        action: 'checkPassword',
        submitLabel: 'Go',
        fieldsClasses: 'l-flex-row-s l-align-end-s'
      }
    }),
    field: field({
      args: {
        type: 'password',
        name: 'password',
        label: 'Password',
        required: true,
        emptyErrorMessage: 'Enter a password',
        widthSmall: '3-4',
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
      <main id="main" class="l-flex l-align-center l-min-height-100-vh">
        ${output.container.start}
          <div class="l-flex l-width-l l-height-l l-width-xl-m l-height-xl-m b-radius-100-pc bg-muted t-sharp">
            ${lockSvg('l-width-m l-height-m l-width-l-m l-height-l-m l-margin-auto')}
          </div>
          <h1 class="l-padding-top-m">${title}</h1>
          <p class="t-l t-line-height-150-pc l-padding-top-xs l-padding-bottom-m l-padding-bottom-l-m">${text}</p>
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
