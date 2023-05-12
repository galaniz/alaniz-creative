/**
 * Render - form
 */

/* Imports */

import { v4 as uuid } from 'uuid'
import { enumNamespace } from '../../vars/enums'
import { scriptData } from '../../vars/data'
import errorSvg from '../svg/error'
import checkSvg from '../svg/check'
import loader from '../loader'

/**
 * Function - output form wrapper
 *
 * @param {object} props
 * @param {object} props.args
 * @param {string} props.args.subject
 * @param {string} props.args.submitLabel
 * @param {string} props.args.successTitle
 * @param {string} props.args.successText
 * @param {string} props.args.id
 * @return {object}
 */

interface Props {
  args: {
    id?: string
    submitLabel?: string
    successTitle?: string
    successText?: string
  }
}

const form = (props: Props = { args: {} }): object => {
  const { args = {} } = props

  const {
    id = '',
    submitLabel = 'Send',
    successTitle = '',
    successText = ''
  } = args

  /* Id required */

  if (id === '') {
    return {
      start: '',
      end: ''
    }
  }

  /* Add to script data */

  if ((scriptData?.id === undefined || scriptData?.id === '') && successTitle !== '') {
    scriptData[`form-${id}`] = {
      successMessage: {
        primary: successTitle,
        secondary: successText
      }
    }
  }

  scriptData.sendUrl = '/ajax/'

  /* Honeypot */

  const honeypotId: string = uuid()
  const honeypotName = `${enumNamespace}_asi`
  const honeypot = `
    <div class="o-form__field l-width-1-1" data-asi>
      <label class="o-form__label" for="${honeypotId}">Website</label>
      <input type="url" name="${honeypotName}" id="${honeypotId}" autocomplete="off" class="js-input">
    </div>
  `

  /* Output */

  const start = `
    <form id="${id}" class="o-form js-send-form" method="post" novalidate>
      <div class="l-flex l-flex-column l-flex-row-l l-flex-wrap l-align-end-l l-gap-margin-m">
        <div class="o-form-error__summary l-width-100-pc l-none outline-none" tabindex="-1">
          <div class="o-info-negative l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                ${errorSvg('l-width-s l-height-s l-width-m-m l-height-m-m')}
              </div>
              <div>
                <h2 class="t t-weight-medium l-margin-0">There is a problem</h2>
                <ul class="o-form-error__list l-flex l-flex-column l-padding-bottom-4xs l-margin-bottom-4xs-all l-margin-0-last t-s t-list-style-none e-underline-all" role="list"></ul>
              </div>
            </div>
          </div>
        </div>
  `

  const end = `
        ${honeypot}
        <div class="o-form-result__negative l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
          <div class="o-info-negative l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                ${errorSvg('l-width-s l-height-s l-width-m-m l-height-m-m')}
              </div>
              <div>
                <h2 class="o-form-result__primary t t-weight-medium l-margin-0"></h2>
              </div>
            </div>
          </div>
        </div>
        <div data-type="submit">
          <button class="o-button o-button-main o-button-large b-radius-l e-transition-quad js-submit" type="submit">
            ${loader()}
            <span>${submitLabel}</span>
          </button>
        </div>
        <div class="o-form-result__positive l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
          <div class="o-info-positive l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
            <div class="l-flex l-gap-margin-3xs">
              <div>
                ${checkSvg('l-width-s l-height-s l-width-m-m l-height-m-m')}
              </div>
              <div>
                <h2 class="o-form-result__primary t t-weight-medium l-margin-0"></h2>
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
