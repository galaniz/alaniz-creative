/**
 * Objects - Info
 */

/* Imports */

import type { InfoArgs } from './InfoTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { configVars } from '../../config/config.js'
import { InfoSvg } from '../../svg/Info/Info.js'
import { CheckmarkSvg } from '../../svg/Checkmark/Checkmark.js'
import { ErrorSvg } from '../../svg/Error/Error.js'

/**
 * Output info message.
 *
 * @param {InfoArgs} args
 * @return {string} HTMLDivElement
 */
const Info = (args: InfoArgs): string => {
  /* Args required */

  if (!isObjectStrict(args)) {
    return ''
  }

  const {
    title,
    text,
    template = false,
    type = 'neutral'
  } = args

  /* Types */

  const isError = type === 'error'
  const isSuccess = type === 'success'
  const isErrorSummary = type === 'error-summary'
  const isAlert = isError || isSuccess

  /* Text */

  const hasTitle = isStringStrict(title)
  let textOutput = ''

  if (hasTitle) {
    textOutput += `
      <h2 class="text-m lead-open wt-medium m-0">
        ${title}
      </h2>
    `
  }

  if (isStringStrict(text)) {
    textOutput = `
      <div>
        ${textOutput}
        <p class="text-${hasTitle ? 's' : 'm wt-medium'} lead-open m-0">
          ${text}
        </p>
      </div>
    `
  }

  if (isErrorSummary) {
    textOutput = `
      <div>
        ${textOutput}
        <ul class="flex col pb-4xs gap-4xs text-s list-none e-line-all" role="list"></ul>
      </div>
    `
  }

  if (!textOutput) {
    return ''
  }

  /* Icon */

  const Icon = isError || isErrorSummary ? ErrorSvg : isSuccess ? CheckmarkSvg : InfoSvg

  /* Styles */

  addStyle('objects/Info/Info')

  /* Attributes */

  let attrs = ''

  if (template) {
    attrs = ' tabindex="-1"' + (isAlert ? ' role="alert"' : '')
  }

  /* Output */

  const output = /* html */`
    <div class="info-${isErrorSummary ? 'error' : type} flex gap-3xs px-xs py-xs b-radius-s w-full outline-none"${attrs}>
      ${Icon({
        width: 's',
        height: 's',
        classes: 'w-m-m h-m-m shrink-0'
      })}
      ${textOutput}
    </div>
  `

  /* Template */

  const templateId = `tmpl-info-${type}`

  if (template) {
    configVars.template.set(templateId, output)
  }

  /* Result */

  return template ? templateId : output
}

/* Exports */

export { Info }
