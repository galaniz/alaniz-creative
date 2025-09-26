/**
 * Components - Protect
 */

/* Imports */

import { Form } from '@alanizcreative/formation-static/objects/Form/Form.js'
import { FormField } from '@alanizcreative/formation-static/objects/Form/FormField.js'
import { Layout } from '../Layout/Layout.js'
import { LockSvg } from '../../svg/Lock/Lock.js'

/**
 * Output password protected page.
 *
 * @return {string} HTMLElement
 */
const Protect = (): string => {
  /* Title, text and type */

  const title = 'This content is protected'
  const text = 'To view, please enter the password.'
  const contentType = 'page'
  const slug = 'protect'
  const id = 'protect'

  /* Form */

  const [formStart, formEnd] = Form({
    args: {
      action: 'password',
      submitLabel: 'Go'
    }
  })

  /* Field */

  const [fieldStart, fieldEnd] = FormField({
    args: {
      type: 'password',
      name: 'password',
      label: 'Password',
      required: true,
      emptyError: 'Enter a password',
      widthSmall: '9',
      grow: true
    }
  })

  /* Output */

  return Layout({
    id,
    slug,
    contentType,
    itemData: {
      id,
      slug,
      contentType,
      title,
      baseType: contentType,
      template: 'blank'
    },
    meta: {
      title,
      index: false
    },
    content: /* html */`
      <div class="container-xs w-full pt-2xl pb-3xl">
        <div class="flex w-l h-l w-xl-m h-xl-m b-radius-full bg-muted sharp">
          ${LockSvg({ classes: 'w-m h-m w-l-m h-l-m m-auto' })}
        </div>
        <h1 class="pt-m">${title}</h1>
        <p class="text-l lead-open pt-xs pb-m pb-l-m">${text}</p>
        ${formStart}${fieldStart}${fieldEnd}${formEnd}
      </div>
    `
  })
}

/* Exports */

export { Protect }
