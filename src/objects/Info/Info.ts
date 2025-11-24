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

  /* Text */

  const hasTitle = isStringStrict(title)
  let textOutput = ''

  if (hasTitle) {
    textOutput += `
      <h2 class="text-m lead-open wt-medium m-0"${template ? ' data-info-title' : ''}>
        ${title}
      </h2>
    `
  }

  if (isStringStrict(text)) {
    textOutput = `
      <div>
        ${textOutput}
        <p class="text-${hasTitle ? 's' : 'm wt-medium'} lead-open m-0"${template ? ' data-info-text' : ''}>
          ${text}
        </p>
      </div>
    `
  }

  if (!textOutput) {
    return ''
  }

  /* Icon */

  const Icon = type === 'error' ? ErrorSvg : type === 'success' ? CheckmarkSvg : InfoSvg

  /* Styles */

  addStyle('objects/Info/Info')

  /* Attributes */

  let attrs = ''

  if (template) {
    attrs = ' tabindex="-1" role="alert"'
  }

  /* Output */

  const output = /* html */`
    <div class="info-${type} flex gap-3xs px-xs py-xs b-radius-s w-full none outline-none"${attrs}>
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
