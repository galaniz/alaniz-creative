/**
 * Object - Form Field
 */

/* Imports */

import type { FormFieldProps } from './FormTypes.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'

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
    fieldClasses += ` col-${widthSmall}`
  }

  if (isStringStrict(widthMedium)) {
    fieldClasses += ` col-${widthMedium}`
  }

  if (isStringStrict(widthLarge)) {
    fieldClasses += ` col-${widthLarge}`
  }

  if (grow) {
    fieldClasses += ' grow-1'
  }

  if (type === 'checkbox' || type === 'radio') {
    classes += ' a-hide-vis'
  }

  /* Attributes */

  const fieldAttr = 'data-form-field'
  let attr = 'data-form-input'

  if (isStringStrict(placeholder)) {
    attr += ` placeholder="${placeholder}"`
  }

  if (isStringStrict(autoComplete)) {
    attr += ` autocomplete="${autoComplete}"`
  }

  if (type === 'textarea') {
    attr += ` rows="${rows}"`
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
      attr,
      requiredIcon: '<span class="form-required-icon" aria-hidden="true">*</span>'
    }
  }
}

/* Exports */

export { FormField }
