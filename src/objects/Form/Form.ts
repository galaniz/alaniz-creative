/**
 * Object - Form
 */

/* Imports */

import type { FormProps } from './FormTypes.js'
import { v4 as uuid } from 'uuid'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { setStoreItem } from '@alanizcreative/formation-static/store/store.js'
import { addScript, addStyle } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { config, configVars } from '../../config/config.js'
import { ErrorSvg } from '../../svg/Error/Error.js'
import { Loader } from '../Loader/Loader.js'
import { Info } from '../Info/Info.js'

/**
 * Filter formation form props.
 *
 * @param {FormProps} props
 * @return {FormProps}
 */
const Form = (props: FormProps): FormProps => {
  /* Props and args */

  const { args } = props
  const {
    action = 'contact',
    successTitle,
    successText,
    toEmail,
    senderEmail,
    submitLabel = 'Send'
  } = args

  /* Error summary */

  const errorSummaryId = 'tmpl-error-summary'

  configVars.template.set(errorSummaryId, /* html */`
    <div class="info-error flex gap-3xs px-xs py-xs b-radius-s w-full none outline-none" tabindex="-1">
      ${ErrorSvg({
        width: 's',
        height: 's',
        classes: 'w-m-m h-m-m'
      })}
      <div>
        <h2 class="text-m wt-medium m-0">There is a problem</h2>
        <ul class="flex col pb-4xs gap-4xs text-s ls-none e-line-all" role="list"></ul>
      </div>
    </div>
  `)

  /* Inline error */

  const errorInlineId = 'tmpl-error-inline'

  configVars.template.set(errorInlineId, /* html */`
    <span class="form-error-inline flex gap-4xs pb-3xs">
      ${ErrorSvg({ width: 'xs', height: 's' })}
      <span class="a-hide-vis">Error: </span>
      <span class="text-s wt-medium" data-form-error-text></span>
    </span>
  `)

  /* Error */

  const errorId = Info({
    title: 'Sorry, there is a problem with the service.',
    text: 'Try again later.',
    template: true,
    type: 'error'
  })

  /* Success */

  const successId = Info({
    title: 'Thank you for your message!',
    text: 'I will get back to you as soon as possible.',
    template: true,
    type: 'success'
  })

  /* Loader */

  const loaderId = Loader()

  /* Id */

  const formId = uuid()
  configVars.formId = formId

  /* Attributes */

  const siteKey = config.env.prod ? '0x4AAAAAABpyURQ9TLndYvrm' : '1x00000000000000000000BB'
  let formAttr = ` action="${action}${config.env.prod ? '' : '-dev'}" error-summary="${errorSummaryId}" error-inline="${errorInlineId}" error="${errorId}" success="${successId}" loader="${loaderId}" sitekey="${siteKey}"`

  if (isStringStrict(successTitle)) {
    formAttr += ` success-title="${successTitle}"`
  }

  if (isStringStrict(successText)) {
    formAttr += ` success-text="${successText}"`
  }

  /* Meta */

  if (action === 'contact' && isStringStrict(toEmail) && isStringStrict('senderEmail')) {
    setStoreItem('formMeta', {
      toEmail,
      senderEmail
    }, formId)
  }

  /* Scripts and styles */

  addStyle('objects/Form/Form')
  addScript('objects/Form/FormClient')

  /* Output */

  return {
    ...props,
    args: {
      ...args,
      id: formId,
      formTag: 'ac-form',
      formClasses: 'form',
      formAttr,
      fields: `<div id="ac-turnstile-${formId}" class="none"></div>`,
      fieldsClasses: 'form flex wrap align-end gap-m',
      fieldsAttr: 'novalidate',
      submitFieldClasses: 'relative',
      submitClasses: 'button button-primary button-xl b-radius-l e-trans e-quad',
      submitLabel,
      honeypotName: 'ac_hp',
      honeypotFieldClasses: 'form-field-hp col-12',
      honeypotFieldAttr: 'data-form-field="url"',
      honeypotLabelClasses: 'form-label',
      honeypotClasses: 'form-input-url',
      honeypotAttr: 'data-form-input'
    }
  }
}

/* Exports */

export { Form }
