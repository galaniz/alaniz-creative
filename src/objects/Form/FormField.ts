/**
 * Object - Form Field
 */

/* Imports */

import type { FormFieldProps } from './FormTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addScript } from '@alanizcreative/formation-static/utils/scriptStyle/scriptStyle.js'
import { configVars } from '../../config/config.js'

/**
 * Filter formation form field props.
 *
 * @param {FormFieldProps} props
 * @return {FormFieldProps}
 */
const FormField = (props: FormFieldProps): FormFieldProps => {
  /* Props and args */

  const { args } = props
  const {
    name,
    type = 'text',
    width = '12',
    widthSmall,
    widthMedium,
    widthLarge,
    autoComplete,
    placeholder,
    rows = 5,
    grow = false
  } = args

  /* Classes */

  let fieldClasses = `form-field col-${width}`
  let classes = `form-input-${type}`

  if (isStringStrict(widthSmall)) {
    fieldClasses += ` col-${widthSmall}-s`
  }

  if (isStringStrict(widthMedium)) {
    fieldClasses += ` col-${widthMedium}-m`
  }

  if (isStringStrict(widthLarge)) {
    fieldClasses += ` col-${widthLarge}-l`
  }

  if (grow) {
    fieldClasses += ' grow-1'
  }

  if (type === 'checkbox' || type === 'radio') {
    classes += ' a-hide-vis'
  }

  /* Attributes */

  let fieldAttr = 'data-form-field'
  const attr: string[] = []

  if (isStringStrict(placeholder)) {
    attr.push(`placeholder : ${placeholder}`)
  }

  if (isStringStrict(autoComplete)) {
    attr.push(`autocomplete : ${autoComplete}`)
  }

  if (type === 'textarea') {
    attr.push(`rows : ${rows}`)
  }

  /* Email */

  if (type === 'email') {
    args.fieldTag = 'ac-form-field-email'

    fieldAttr += ` form-id="${configVars.formId}" input-name="${name}"`

    addScript('objects/Form/FormFieldEmailClient')
  }

  /* Output */

  return {
    ...props,
    args: {
      ...args,
      fieldClasses,
      fieldAttr,
      labelClasses: 'form-label',
      classes,
      attr: attr.join('\n'),
      requiredIcon: '<span class="form-required-icon" aria-hidden="true">*</span>'
    }
  }
}

/* Exports */

export { FormField }
