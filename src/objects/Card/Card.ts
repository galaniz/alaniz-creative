/**
 * Objects - Card
 */

/* Imports */

import type { CardProps, CardType } from './CardTypes.js'
import type { ParentArgs } from '@alanizcreative/formation-static/global/globalTypes.js'
import { isArrayStrict } from '@alanizcreative/formation-static/utils/array/array.js'
import { isObjectStrict } from '@alanizcreative/formation-static/utils/object/object.js'
import { isStringStrict } from '@alanizcreative/formation-static/utils/string/string.js'
import { addStyle } from '@alanizcreative/formation-static/scripts/scripts.js'
import { getLink } from '@alanizcreative/formation-static/utils/link/link.js'
import { configBlobs } from '../../config/configOptions.js'
import { Image } from '../Image/Image.js'
import { LockSvg } from '../../svg/Lock/Lock.js'

/**
 * Output card item and content.
 *
 * @param {CardProps} props
 * @return {string} HTMLLIElement
 */
const Card = (props: CardProps): string => {
  /* Props and args required */

  if (!isObjectStrict(props)) {
    return ''
  }

  const { args } = props

  if (!isObjectStrict(args)) {
    return ''
  }

  /* Args */

  const {
    headingLevel = 3,
    type = 'minimal',
    internalLink,
    index = 0,
    length = 1
  } = args

  const n = index + 1

  /* Internal link required */

  if (!isObjectStrict(internalLink)) {
    return ''
  }

  const {
    passwordProtect,
    contentType,
    category,
    title,
    hero,
    blob,
    theme
  } = internalLink

  const link = getLink(internalLink)

  /* Title, link and hero required */

  if (!isStringStrict(title) || !isStringStrict(link) || !hero) {
    return ''
  }

  /* Layout */

  const isMinimal = type === 'minimal'
  const isCascade = type === 'cascade'
  const isAlternate = type === 'alternate'
  const isAlternating = isAlternate || isCascade
  const isWidow = length % 3 === 2
  const isHalf = (n % 3 === 2 || n % 3 === 0)
  const isFull = (isCascade && !isHalf) || isAlternate

  /* Parents */

  const parents: ParentArgs[] = [
    {
      renderType: 'card',
      args: {
        internalLink
      }
    }
  ]

  if (isMinimal || (isCascade && isHalf)) {
    parents.push({
      renderType: 'column',
      args: {
        width: '12',
        widthSmall: isMinimal ? '6' : undefined,
        widthMedium: isCascade && isHalf ? '4' : undefined
      }
    })
  }

  if (isFull) {
    parents.push({
      renderType: 'column',
      args: {
        width: '12',
        widthSmall: isMinimal ? '6' : undefined,
        widthMedium: isCascade && isHalf ? '4' : undefined
      }
    })
  }

  if (props.parents && !isFull) {
    parents.push(...props.parents)
  }

  /* Text */

  const headingTag = `h${headingLevel}`
  let headingClasses = 'theme deco-none'
  let textClasses = ''
  let subText = ''

  if (isAlternating) {
    headingClasses += ' heading-l'
    textClasses = 'pt-m pt-l-m'
  } else {
    headingClasses += ' heading-s'
    textClasses = 'pt-2xs pt-m-m'
  }

  if (isAlternate) {
    textClasses += index % 2 !== 0 ? ' mr-auto' : ' ml-auto'
  }

  if (isCascade) {
    textClasses += ' card-text'
  }

  if (contentType === 'work' && isArrayStrict(category)) {
    subText = /* html */`
      <p class="text-xs pt-3xs relative current">
        <span class="a-hide-vis">Categories: </span>
        ${category.map(cat => cat.title).join(' + ')}
      </p>
    `
  }

  /* Container */

  let containerClasses = 'col-12 themeable'
  let classes = 'flex col'
  let styles = ''

  if (isAlternating) {
    containerClasses += ` card-${type} relative pt-xl pb-xl pt-3xl-m pb-3xl-m`
    classes += ' align-center'
  }

  if (isWidow) {
    containerClasses += ' card-widow'
  }

  if (isMinimal) {
    containerClasses += ' col-6-s'
  }

  if (theme) {
    styles = ` style="--theme-dark:${theme['primary-dark']};--theme-light:${theme['primary-light']}"`
  }

  /* Blob */

  let blobOutput = ''

  if (isAlternating && blob) {
    const path = configBlobs.get(blob)
    const reverse = index % 2 !== 0

    blobOutput = /* html */`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        aria-hidden="true"
        focusable="false"
        role="img"
        class="card-blob${reverse ? ' card-blob-inverse' : ''} absolute top-0 left-0 right-0 m-auto"
      >
        <path
          d="${path}"
          fill="none"
          stroke="var(--theme-color)"
          stroke-opacity="0.5"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    `
  }

  /* Lock */

  let lockOutput = ''

  if (passwordProtect) {
    lockOutput = `${LockSvg({ width: 's', height: 's' })}<span class="a-hide-vis"> (password protected)</span>`
  }

  /* Styles */

  addStyle('objects/Card/Card')

  /* Output */

  return /* html */`
    <li class="${containerClasses}"${styles}>
      ${blobOutput}
      <div class="relative overflow-hidden e-trans e-quad e-shift">
        <div class="${classes}">
          <div class="${textClasses}">
            <${headingTag} class="${headingClasses}">
              <a href="${link}" class="before outline-tight" data-rich>${title}</a>${lockOutput}
            </${headingTag}>
            ${subText}
          </div>
          ${Image({
            args: {
              ...hero,
              aspectRatio: '16-10'
            },
            parents
          })}
        </div>
      </div>
    </li>
  `
}

/**
 * Output card list.
 *
 * @param {string} output
 * @param {CardType} [type='minimal']
 * @param {string} [classes]
 * @return {string} HTMLUListElement
 */
const CardContainer = (output: string, type: CardType = 'minimal', classes?: string): string => {
  let listClasses = 'list-none'

  if (type === 'minimal') {
    listClasses += ' flex wrap gap-m gap-l-l'
  }

  if (type === 'cascade') {
    listClasses += ' flex wrap'
  }

  if (isStringStrict(classes)) {
    listClasses += ` ${classes}`
  }

  return /* html */`
    <ul class="${listClasses}" role="list">
      ${output}
    </ul>
  `
}

/* Exports */

export {
  Card,
  CardContainer
}
