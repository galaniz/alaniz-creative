/**
 * Filters
 */

/* Imports */

import { addFilter, resetFilters } from '@alanizcreative/static-site-formation/src/utils/filters'
import getLink from '@alanizcreative/static-site-formation/src/utils/get-link'
import errorSvg from '../svg/error'
import checkSvg from '../svg/check'
import lockSvg from '../svg/lock'
import loader from '../objects/loader'

/**
 * Function - filters for props
 *
 * @return {void}
 */

const filters = (): void => {
  /* Reset */

  resetFilters()

  /* Container */

  addFilter('containerProps', (props: FRM.ContainerProps): FRM.ContainerProps => {
    const { args } = props

    const {
      tag = 'div',
      layout = 'column',
      maxWidth = '',
      paddingTop = '',
      paddingTopLarge = '',
      paddingBottom = '',
      paddingBottomLarge = '',
      gap = '',
      gapLarge = '',
      justify = '',
      align = '',
      richTextStyles = false
    } = args

    let {
      classes = '',
      attr = ''
    } = args

    /* Classes */

    const classesArray: string[] = []

    /* Attributes */

    const attrs: string[] = []

    /* List check */

    if (tag === 'ul' || tag === 'ol') {
      classesArray.push('t-list-style-none')
      attrs.push('role="list"')
    }

    /* Layout */

    let layoutClasses = ''

    if (layout === 'column' && (justify !== '' || align !== '')) {
      layoutClasses = 'l-flex l-flex-column'
    }

    if (layout === 'row') {
      layoutClasses = 'l-flex l-flex-wrap'
    }

    /* Gap */

    let gapClasses = ''

    if (gap !== '') {
      gapClasses = layout === 'row' ? `l-gap-margin-${gap}` : `l-margin-bottom-${gap}-all`
    }

    let gapLargeClasses = ''

    if (gapLarge !== '' && gapLarge !== gap) {
      gapLargeClasses = layout === 'row' ? `l-gap-margin-${gapLarge}-l` : `l-margin-bottom-${gapLarge}-all-l`
    }

    /* Rich text styles */

    if (richTextStyles) {
      classesArray.push('t-rich-text e-underline')

      if (gap === '' && gapLarge === '' && layout === 'column') {
        attrs.push('data-mb')
      }
    }

    /* Output */

    if (classesArray.length > 0) {
      classes += `${classes !== '' ? ' ' : ''}${classesArray.join(' ')}`
    }

    if (attrs.length > 0) {
      attr += `${attr !== '' ? ' ' : ''}${attrs.join(' ')}`
    }

    args.layout = layoutClasses
    args.maxWidth = maxWidth !== '' ? `l-container${maxWidth !== 'default' ? `-${maxWidth}` : ''}` : ''
    args.paddingTop = paddingTop !== '' ? `l-padding-top-${paddingTop}` : ''
    args.paddingTopLarge = paddingTopLarge !== '' ? `l-padding-top-${paddingTopLarge}-m` : ''
    args.paddingBottom = paddingBottom !== '' ? `l-padding-bottom-${paddingBottom}` : ''
    args.paddingBottomLarge = paddingBottomLarge !== '' ? `l-padding-bottom-${paddingBottomLarge}-m` : ''
    args.gap = gapClasses
    args.gapLarge = gapLargeClasses
    args.justify = justify !== '' ? `l-justify-${justify}` : ''
    args.align = align !== '' ? `l-align-${align}` : ''
    args.classes = classes
    args.attr = attr

    return props
  })

  /* Column */

  addFilter('columnProps', (props: FRM.ColumnProps): FRM.ColumnProps => {
    const { args } = props

    const {
      widthSmall = '',
      widthMedium = '',
      widthLarge = '',
      widthCustom,
      justify = '',
      align = '',
      grow = false
    } = args

    let {
      width = '',
      classes = ''
    } = args

    /* Width */

    if (width === '' && widthCustom === undefined) {
      width = '1-1'
    }

    if (widthCustom !== undefined) {
      classes += `${classes !== '' ? ' ' : ''}l-width-custom`
    }

    /* Grow */

    if (grow) {
      classes += `${classes !== '' ? ' ' : ''}l-flex-grow-1`
    }

    /* Output */

    args.width = width !== '' ? `l-width-${width}` : ''
    args.widthSmall = widthSmall !== '' ? `l-width-${widthSmall}-s` : ''
    args.widthMedium = widthMedium !== '' ? `l-width-${widthMedium}-m` : ''
    args.widthLarge = widthLarge !== '' ? `l-width-${widthLarge}-l` : ''
    args.justify = justify !== '' ? `l-justify-${justify}` : ''
    args.align = align !== '' ? `l-align-${align}` : ''
    args.classes = classes

    return props
  })

  /* Form */

  addFilter('formProps', (props: FRM.FormProps): FRM.FormProps => {
    const { args } = props

    const {
      formClasses = '',
      formAttr = '',
      submitClasses = '',
      honeypotFieldClasses = '',
      honeypotLabelClasses = '',
      honeypotClasses = ''
    } = args

    const wrap: boolean = args?.wrap !== undefined ? args.wrap : true
    const row: string = args?.row !== undefined ? args.row : 'm'
    const align: string = args?.align !== undefined ? args.align : 'm'

    let { fieldsClasses = '' } = args

    /* Field classes */

    fieldsClasses += `${fieldsClasses !== '' ? ' ' : ''}l-flex l-flex-column l-flex-row-${row}${wrap ? ' l-flex-wrap' : ''} l-align-end-${align} l-gap-margin-m`

    /* Output */

    args.errorSummary = `
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

    args.errorResult = `
      <div class="o-form-result__negative l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
        <div class="o-info-negative l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
          <div class="l-flex l-gap-margin-3xs">
            <div>
              ${errorSvg('l-width-s l-height-s l-width-m-m l-height-m-m')}
            </div>
            <div>
              <h2 class="o-form-result__primary t t-line-height-150-pc t-weight-medium l-margin-0"></h2>
            </div>
          </div>
        </div>
      </div>
    `

    args.successResult = `
      <div class="o-form-result__positive l-width-100-pc l-none outline-none" role="alert" tabindex="-1">
        <div class="o-info-positive l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
          <div class="l-flex l-gap-margin-3xs">
            <div>
              ${checkSvg('l-width-s l-height-s l-width-m-m l-height-m-m')}
            </div>
            <div>
              <h2 class="o-form-result__primary t t-line-height-150-pc t-weight-medium l-margin-0"></h2>
            </div>
          </div>
        </div>
      </div>
    `

    args.formClasses = `${formClasses}${formClasses !== '' ? ' ' : ''}o-form js-form`
    args.formAttr = `${formAttr}${formAttr !== '' ? ' ' : ''}method="post"`
    args.fieldsClasses = fieldsClasses
    args.submitClasses = `${submitClasses}${submitClasses !== '' ? ' ' : ''}o-button o-button-main o-button-form l-overflow-hidden b-radius-l e-transition-quad js-submit`
    args.submitLoader = loader({ size: 's' })
    args.honeypotFieldClasses = `${honeypotFieldClasses}${honeypotFieldClasses !== '' ? ' ' : ''}o-form__field l-width-1-1`
    args.honeypotLabelClasses = `${honeypotLabelClasses}${honeypotLabelClasses !== '' ? ' ' : ''}o-form__label`
    args.honeypotClasses = `${honeypotClasses}${honeypotClasses !== '' ? ' ' : ''}js-input`

    return props
  })

  /* Field */

  addFilter('fieldProps', (props: FRM.FieldProps): FRM.FieldProps => {
    const { args } = props

    const {
      type = 'text',
      widthSmall = '',
      widthMedium = '',
      widthLarge = '',
      fieldClasses = '',
      fieldsetClasses = '',
      labelClasses = '',
      classes = '',
      grow = false
    } = args

    let { width = '' } = args

    /* Width */

    if (width === '') {
      width = '1-1'
    }

    /* Output */

    args.width = `l-width-${width}`
    args.widthSmall = widthSmall !== '' ? `l-width-${widthSmall}-s` : ''
    args.widthMedium = widthMedium !== '' ? `l-width-${widthMedium}-m` : ''
    args.widthLarge = widthLarge !== '' ? `l-width-${widthLarge}-l` : ''
    args.fieldsetClasses = `${fieldsetClasses}${fieldsetClasses !== '' ? ' ' : ''}o-field__group`
    args.fieldClasses = `${fieldClasses}${fieldClasses !== '' ? ' ' : ''}o-form__field${grow ? ' l-flex-grow-1' : ''}`
    args.labelClasses = `${labelClasses}${labelClasses !== '' ? ' ' : ''}o-form__label`
    args.classes = `${classes}${classes !== '' ? ' ' : ''}js-input${type === 'checkbox' || type === 'radio' ? ' a11y-hide-input' : ''}`
    args.visuallyHiddenClass = 'a11y-visually-hidden'

    return props
  })

  /* Rich text */

  addFilter('richTextProps', (props: FRM.RichTextProps): FRM.RichTextProps => {
    const { args, parents = [] } = props

    const {
      tag = '',
      textStyle = '',
      headingStyle = '',
      align = '',
      style
    } = args

    let { classes = '' } = args

    /* Classes */

    const classesArray: string[] = []

    if (tag === 'blockquote') {
      classesArray.push('t-quote')
    }

    if (align !== '') {
      classesArray.push(`t-align-${align}`)
    }

    /* Style */

    const styleArray: string[] = []

    if (style !== undefined) {
      Object.keys(style).forEach((s) => {
        const st: string = style[s]

        styleArray.push(`${s}:${st}`)
      })
    }

    /* Card */

    const parentType = parents[0] !== undefined ? parents[0].renderType : ''

    if (parentType === 'card' && tag === 'p') {
      classesArray.push('t-link-current')
    }

    /* Output */

    if (classesArray.length > 0) {
      classes += `${classes !== '' ? ' ' : ''}${classesArray.join(' ')}`
    }

    args.textStyle = textStyle !== '' ? `t${textStyle !== 'default' ? `-${textStyle}` : ''}` : ''
    args.headingStyle = headingStyle !== '' ? `t-${headingStyle}` : ''
    args.classes = classes
    args.style = styleArray.length > 0 ? styleArray.join(';') : ''

    return props
  })

  addFilter('richTextOutput', (output: string, props: FRM.RichTextProps): string => {
    const { args, parents = [] } = props

    const {
      tag = '',
      content = []
    } = args

    /* Check if heading */

    const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)

    /* Check if card */

    let cardLink = ''
    let cardProtected = false
    let card = false

    if (parents.length > 0) {
      if (parents[0].renderType === 'card') {
        card = true
      }

      if (card && heading) {
        const {
          internalLink,
          externalLink = ''
        } = parents[0]

        if (internalLink?.passwordProtected !== undefined) {
          cardProtected = internalLink.passwordProtected
        }

        cardLink = getLink(internalLink, externalLink)
      }
    }

    /* Output */

    if (cardLink !== '' && typeof content === 'string') {
      let icon = ''

      if (cardProtected) {
        icon = lockSvg('l-width-s l-height-s', '(password protected)')
      }

      output = `<a class="l-before outline-tight" href="${cardLink}" data-rich>${content}</a>&nbsp;${icon}`
    }

    return output
  })
}

/* Exports */

export default filters
