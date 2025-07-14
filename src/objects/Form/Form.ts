/**
 * Render - form
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { enumNamespace } from '../../vars/enums'
import { scriptData, formMeta } from '../../vars/data'
import errorSvg from '../../svg/Error/Error'
import checkSvg from '../../svg/Checkmark/Checkmark'
import loader from '../Loader/Loader'

/**
 * Function - output form wrapper
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.id
 * @param {string} props.args.action
 * @param {string} props.args.subject
 * @param {string} props.args.toEmail
 * @param {string} props.args.senderEmail
 * @param {string} props.args.submitLabel
 * @param {string} props.args.successTitle
 * @param {string} props.args.successText
 * @param {string} props.args.errorTitle
 * @param {string} props.args.errorText
 * @param {boolean} props.args.wrap
 * @param {string} props.args.row
 * @param {string} props.args.align
 * @return {object}
 */

interface Props {
  args: {
    id?: string
    action?: string
    subject?: string
    toEmail?: string
    senderEmail?: string
    submitLabel?: string
    successTitle?: string
    successText?: string
    errorTitle?: string
    errorText?: string
    wrap?: boolean
    row?: string
    align?: string
  }
}

const form = (props: Props = { args: {} }): Render.Return => {
  const { args = {} } = props

  const {
    id = '',
    action = 'send-form',
    subject = '',
    toEmail = '',
    senderEmail = '',
    submitLabel = 'Send',
    successTitle = '',
    successText = '',
    errorTitle = '',
    errorText = '',
    wrap = true,
    row = 'm',
    align = 'm'
  } = args

  /* Id required */

  if (id === '') {
    return {
      start: '',
      end: ''
    }
  }

  /* Add to form meta data */

  if (subject !== '' || toEmail !== '' || senderEmail !== '') {
    const meta: { subject?: string, toEmail?: string, senderEmail?: string } = {}

    if (subject !== '') {
      meta.subject = subject
    }

    if (toEmail !== '') {
      meta.toEmail = toEmail
    }

    if (senderEmail !== '') {
      meta.senderEmail = senderEmail
    }

    formMeta[id] = meta
  }

  /* Add to script data */

  if (scriptData[`form-${id}`] === undefined && (successTitle !== '' || errorTitle !== '')) {
    const messages: { successMessage?: object, errorMessage?: object } = {}

    if (successTitle !== '') {
      messages.successMessage = {
        primary: successTitle,
        secondary: successText
      }
    }

    if (errorTitle !== '') {
      messages.errorMessage = {
        primary: errorTitle,
        secondary: errorText
      }
    }

    scriptData[`form-${id}`] = messages
  }

  scriptData.sendUrl = '/ajax/'

  /* Honeypot */

  const honeypotId: string = uuid()
  const honeypotName = `${enumNamespace}_asi`
  const honeypot = `
    <div class="o-form__field col-12" data-asi>
      <label class="o-form__label" for="${honeypotId}">Website</label>
      <input type="url" name="${honeypotName}" id="${honeypotId}" autocomplete="off" class="js-input">
    </div>
  `

  /* Output */

  const start = `
    <form id="${id}" class="o-form js-send-form" data-action="${action}" method="post" novalidate>
      <div class="flex col row-${row}${wrap ? ' flex-wrap' : ''} align-end-${align} gap-m">
        <div class="o-form-error__summary w-full none outline-none" tabindex="-1">
          <div class="info-negative pl-xs pr-xs pt-xs pb-xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                ${errorSvg('w-s h-s w-m-m h-m-m')}
              </div>
              <div>
                <h2 class="text-m wt-medium m-0">There is a problem</h2>
                <ul class="o-form-error__list flex col pb-4xs m-bottom-4xs-all m-0-last text-s ls-none e-line-all" role="list"></ul>
              </div>
            </div>
          </div>
        </div>
  `

  const end = `
        ${honeypot}
        <div class="o-form-result__negative w-full none outline-none" role="alert" tabindex="-1">
          <div class="info-negative pl-xs pr-xs pt-xs pb-xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                ${errorSvg('w-s h-s w-m-m h-m-m')}
              </div>
              <div>
                <h2 class="o-form-result__primary text-m lead-open wt-medium m-0"></h2>
              </div>
            </div>
          </div>
        </div>
        <div data-type="submit">
          <button class="button button-primary button-xl overflow-hidden b-radius-l e-trans e-quad js-submit" type="submit">
            ${loader({ size: 's' })}
            <span>${submitLabel}</span>
          </button>
        </div>
        <div class="o-form-result__positive w-full none outline-none" role="alert" tabindex="-1">
          <div class="info-positive pl-xs pr-xs pt-xs pb-xs b-radius-s">
            <div class="flex gap-3xs">
              <div>
                ${checkSvg('w-s h-s w-m-m h-m-m')}
              </div>
              <div>
                <h2 class="o-form-result__primary text-m lead-open wt-medium m-0"></h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  `

  return {
    start,
    end
  }
}

/* Exports */

export default form
