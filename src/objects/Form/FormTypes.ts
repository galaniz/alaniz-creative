/**
 * Objects - Form Types
 */

import type {
  FormArgs as FormationFormArgs,
  FormFieldArgs as FormationFormFieldArgs
} from '@alanizcreative/formation-static/objects/Form/FormTypes.js'
import type { RenderFunctionArgs } from '@alanizcreative/formation-static/render/renderTypes.js'
import type { Item } from '../../global/globalTypes.js'
import type { ConfigColumn } from '../../config/configTypes.js'
import { z } from 'zod'

const formFieldTypeOption = z.enum([
  'text',
  'email',
  'tel',
  'number',
  'textarea',
  'checkbox',
  'radio',
  'select'
])

export const formFieldSchema = z.object({
  renderType: z.literal('formField'),
  name: z
    .string()
    .describe('Field name submitted with the form, for example email.'),
  label: z
    .string()
    .describe('Visible label for the field.'),
  type: formFieldTypeOption
    .optional()
    .describe('Input type. Defaults to text.'),
  required: z
    .boolean()
    .optional()
    .describe('Whether the field must be filled in.'),
  rows: z
    .number()
    .int()
    .optional()
    .describe('Visible rows, for a textarea.'),
  emptyError: z
    .string()
    .optional()
    .describe('Message shown when a required field is left empty.'),
  invalidError: z
    .string()
    .optional()
    .describe('Message shown when the value is the wrong shape, for example a malformed email.')
})

export const formSchema = z.object({
  renderType: z.literal('form'),
  successTitle: z
    .string()
    .describe('Heading shown after the form is sent.'),
  successText: z
    .string()
    .describe('Message shown after the form is sent.'),
  toEmail: z
    .string()
    .describe('Address submissions are delivered to.'),
  senderEmail: z
    .string()
    .describe('Address submissions are sent from. Must be on a verified domain.'),
  content: z
    .array(formFieldSchema)
    .describe('The fields in the form, in the order they appear.')
})

/**
 * @typedef {object} FormFieldSchema
 * @prop {'formField'} renderType
 * @prop {string} name
 * @prop {string} label
 * @prop {FormFieldType} [type='text']
 * @prop {boolean} [required=false]
 * @prop {number} [rows]
 * @prop {string} [emptyError]
 * @prop {string} [invalidError]
 */
export type FormFieldSchema = z.infer<typeof formFieldSchema>

/**
 * @typedef {'text'|'email'|'tel'|'number'|'textarea'|'checkbox'|'radio'|'select'} FormFieldType
 */
export type FormFieldType = z.infer<typeof formFieldTypeOption>

/**
 * @typedef {object} FormSchema
 * @prop {'form'} renderType
 * @prop {string} successTitle
 * @prop {string} successText
 * @prop {string} toEmail
 * @prop {string} senderEmail
 * @prop {FormFieldSchema[]} content
 */
export type FormSchema = z.infer<typeof formSchema>

/**
 * @typedef {'contact'|'password'} FormType
 */
export type FormType = 'contact' | 'password'

/**
 * @typedef {'contact'|'contact-dev'|'password'|'password-dev'} FormAction
 */
export type FormAction = 'contact' | 'contact-dev' | 'password' | 'password-dev'

/**
 * @typedef {function} FormTokenWait
 * @param {string} token
 * @return {void}
 */
export type FormTokenWait = ((token: string) => void)

/**
 * @typedef {object} FormArgs
 * @extends {FormationFormArgs}
 * @prop {FormType} [type='contact']
 * @prop {string} [successTitle]
 * @prop {string} [successText]
 * @prop {string} [toEmail]
 * @prop {string} [senderEmail]
 */
export interface FormArgs extends FormationFormArgs {
  type?: FormType
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
