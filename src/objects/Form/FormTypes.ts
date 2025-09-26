/**
 * Objects - Form Types
 */

/* Imports */

import type { Item } from '../../global/globalTypes.js'
import type { ConfigColumn } from '../../config/configTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type {
  FormArgs as FormationFormArgs,
  FormFieldArgs as FormationFormFieldArgs
} from '@alanizcreative/formation-static/objects/Form/FormTypes.js'

/**
 * @typedef {'contact'|'password'} FormAction
 */
export type FormAction = 'contact' | 'password'

/**
 * @typedef {object} FormArgs
 * @extends {FormationFormArgs}
 * @prop {FormAction} [action='contact']
 * @prop {string} [successTitle]
 * @prop {string} [successText]
 * @prop {string} [toEmail]
 * @prop {string} [senderEmail]
 */
export interface FormArgs extends FormationFormArgs {
  action?: FormAction
  successTitle?: string
  successText?: string
  toEmail?: string
  senderEmail?: string
}

/**
 * @typedef {object} FormProps
 * @extends {RenderFunctionArgs}
 * @prop {FormArgs} args
 * @prop {Item} [itemData]
 */
export interface FormProps extends RenderFunctionArgs  {
  args: FormArgs
  itemData?: Item
}

/**
 * @typedef {object} FormFieldArgs
 * @extends {FormationFormFieldArgs}
 * @prop {ConfigColumn} [width='12']
 * @prop {ConfigColumn} [widthSmall]
 * @prop {ConfigColumn} [widthMedium]
 * @prop {ConfigColumn} [widthLarge]
 * @prop {string} [autoComplete]
 * @prop {string} [placeholder]
 * @prop {number} [rows=5]
 * @prop {boolean} [grow=false]
 */
export interface FormFieldArgs extends FormationFormFieldArgs {
  width?: ConfigColumn
  widthSmall?: ConfigColumn
  widthMedium?: ConfigColumn
  widthLarge?: ConfigColumn
  autoComplete?: string
  placeholder?: string
  rows?: number
  grow?: boolean
}

/**
 * @typedef {object} FormFieldProps
 * @extends {RenderFunctionArgs}
 * @prop {FormFieldArgs} args
 * @prop {Item} [itemData]
 */
export interface FormFieldProps extends RenderFunctionArgs {
  args: FormFieldArgs
  itemData?: Item
} 
