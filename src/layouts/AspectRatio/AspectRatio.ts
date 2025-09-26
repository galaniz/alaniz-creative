/**
 * Layouts - Aspect Ratio
 */

/* Imports */

import type { AspectRatioProps } from './AspectRatioTypes.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isNumber } from '@alanizcreative/formation-static/utils/number/number.js'

/**
 * Output custom aspect ratio block.
 *
 * @param {AspectRatioProps} props
 * @return {string[]} HTMLDivElement
 */
const AspectRatio = (props: AspectRatioProps): string[] => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return []
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return []
  }

  /* Args */

  const { percent = 100 } = args

  /* Percent required */

  if (!isNumber(percent)) {
    return []
  }

  /* Output */

  return [
    `<div class="relative ar-1-1 w-full" style="--aspect-ratio-padding:${percent}%">`,
    '</div>'
  ]
}

/* Exports */

export { AspectRatio }
