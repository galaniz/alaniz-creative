/**
 * Objects - Form Client
 */

import type { FormAction, FormTokenWait } from './FormTypes.js'
import type { ServerlessActionData } from '@alanizcreative/formation-static/serverless/serverlessTypes.js'
import { ResponseError } from '@alanizcreative/formation/utils/ResponseError/ResponseError.js'
import { Form as FormBase } from '@alanizcreative/formation/objects/Form/Form.js'
import { isHtmlElement } from '@alanizcreative/formation/utils/html/html.js'
import { getItem } from '@alanizcreative/formation/items/items.js'
import { setDisplay } from '@alanizcreative/formation/utils/display/display.js'
import { isString } from '@alanizcreative/formation/utils/string/string.js'

/**
 * Handles form submissions.
 */
class Form extends FormBase {
  /**
   * Submit button.
   *
   * @type {HTMLButtonElement|null}
   */
  submits: HTMLButtonElement | null = null

  /**
   * Serverless action.
   *
   * @type {FormAction}
   */
  action: FormAction = 'contact'

  /**
   * Success title.
   *
   * @type {string}
   */
  successTitle: string = ''

  /**
   * Success text.
   *
   * @type {string}
   */
  successText: string = ''

  /**
   * Turnstile site key.
   *
   * @type {string}
   */
  siteKey: string = ''

  /**
   * Turnstile script loaded.
   *
   * @type {Promise<void>|null}
   */
  static #turnstileReady: Promise<void> | null = null

  /**
   * Turnstile widget rendered.
   *
   * @private
   * @type {Promise<void>|null}
   */
  #turnstileRendered: Promise<void> | null = null

  /**
   * ID of the rendered Turnstile widget.
   *
   * @private
   * @type {string}
   */
  #turnstileId: string = ''

  /**
   * Current unused Turnstile token.
   *
   * @private
   * @type {string}
   */
  #turnstileToken: string = ''

  /**
   * Request waiting for a Turnstile token.
   *
   * @private
   * @type {FormTokenWait|null}
   */
  #turnstileTokenWait: FormTokenWait | null = null

  /**
   * ID for focus timeout.
   *
   * @private
   * @type {number}
   */
  #delayId: number = 0

  /**
   * ID for loader timeout.
   *
   * @private
   * @type {number}
   */
  #loadDelayId: number = 0

  /**
   * Create new instance.
   */
  constructor () { super() } // eslint-disable-line @typescript-eslint/no-useless-constructor

  /**
   * Init after added to DOM.
   */
  override connectedCallback (): void {
    super.connectedCallback()

    /* Items */

    const submits = getItem('[type="submit"]', this)

    if (isHtmlElement(submits, HTMLButtonElement)) {
      this.submits = submits
    }

    /* Attributes */

    this.action = (this.getAttribute('action') || 'contact') as FormAction
    this.siteKey = this.getAttribute('sitekey') || ''
    this.successTitle = this.getAttribute('success-title') || ''
    this.successText = this.getAttribute('success-text') || ''

    /* Request Turnstile token on focus */

    this.addEventListener('focusin', () => { void this.#renderTurnstile() }, { once: true })
  }

  /**
   * Clean up after removed from DOM.
   */
  override async disconnectedCallback (): Promise<void> {
    await super.disconnectedCallback()

    this.submits = null

    clearTimeout(this.#delayId)
    clearTimeout(this.#loadDelayId)
  }

  /**
   * Load Turnstile script.
   *
   * @private
   * @return {Promise<void>}
   */
  static loadTurnstile (): Promise<void> {
    if (Form.#turnstileReady) {
      return Form.#turnstileReady
    }

    Form.#turnstileReady = new Promise(resolve => {
      if (window.turnstile) {
        resolve()
        return
      }

      const scriptId = 'ac-turnstile-script'
      const script = document.getElementById(scriptId)

      if (script) {
        script.addEventListener('load', () => { resolve() }, { once: true })
        script.addEventListener('error', () => { resolve() }, { once: true })

        return
      }

      const newScript = document.createElement('script')

      newScript.id = scriptId
      newScript.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      newScript.onload = () => { resolve() }
      newScript.onerror = () => { resolve() }

      document.body.appendChild(newScript)
    })

    return Form.#turnstileReady
  }

  /**
   * Handle display of result.
   *
   * @private
   * @param {'error'|'success'} type
   * @param {HTMLElement|null} loader
   * @param {string} [title]
   * @param {string} [text]
   */
  #displayResult (
    type: 'error' | 'success',
    loader: HTMLElement | null,
    title?: string,
    text?: string
  ): void {
    const result = this.getClone(type, this.form)

    if (!result) {
      return
    }

    if (isString(title)) {
      const resultTitle = getItem('h2', result)

      if (resultTitle) {
        resultTitle.textContent = title
      }
    }

    if (isString(text)) {
      const resultText = getItem('p', result)

      if (resultText) {
        resultText.textContent = text
      }
    }

    clearTimeout(this.#delayId)

    this.#delayId = setDisplay(result, 'focus')

    setDisplay(loader, 'hide', 'loader')

    if (this.submits) {
      this.submits.disabled = false
    }

    this.submitted = false
  }

  /**
   * Render the Turnstile widget.
   *
   * @private
   * @return {Promise<void>}
   */
  #renderTurnstile (): Promise<void> {
    if (this.#turnstileRendered) {
      return this.#turnstileRendered
    }

    this.#turnstileRendered = (async () => {
      await Form.loadTurnstile()

      if (!window.turnstile) {
        return
      }

      this.#turnstileId = window.turnstile.render(`#ac-turnstile-${this.id}`, {
        sitekey: this.siteKey,

        callback: token => {
          this.#turnstileToken = token

          // Resolve the pending token request.
          this.#turnstileTokenWait?.(token)

          // Clear the request so it cannot be resolved again.
          this.#turnstileTokenWait = null
        },

        'expired-callback': () => {
          this.#turnstileToken = ''
        },

        'timeout-callback': () => {
          // Resolve the pending request with no token.
          this.#turnstileTokenWait?.('')

          // Clear the request so it cannot be resolved again.
          this.#turnstileTokenWait = null
        },

        'error-callback': () => {
          // Resolve the pending request with no token.
          this.#turnstileTokenWait?.('')

          // Clear the request so it cannot be resolved again.
          this.#turnstileTokenWait = null
        }
      }) || ''
    })()

    return this.#turnstileRendered
  }

  /**
   * Get a fresh Turnstile token.
   *
   * @private
   * @return {Promise<string>}
   */
  async #getTurnstileToken (): Promise<string> {
    await this.#renderTurnstile()

    if (!this.#turnstileId) {
      return ''
    }

    const token = this.#turnstileToken || await new Promise<string>(resolve => {
      // Store the request so the Turnstile callback can resolve it.
      this.#turnstileTokenWait = resolve
    })

    this.#turnstileToken = ''

    window.turnstile?.reset(this.#turnstileId)

    return token
  }

  /**
   * Submit handler on form element sends data to worker if valid.
   *
   * @param {SubmitEvent} e
   * @return {Promise<void>}
   */
  override async submit (e: SubmitEvent): Promise<void> {
    e.preventDefault()

    /* Hide result */

    if (this.clones.has('error')) {
      setDisplay(this.getClone('error'), 'hide')
    }

    if (this.clones.has('success')) {
      setDisplay(this.getClone('success'), 'hide')
    }

    /* Submit state */

    this.submitted = true

    /* Validate */

    if (!this.validate()) {
      return
    }

    /* Submit button */

    if (this.submits) {
      this.submits.disabled = true
    }

    /* Loader */

    clearTimeout(this.#loadDelayId)

    const loader = this.getClone('loader', this.submits?.parentElement)

    this.#loadDelayId = setDisplay(loader, 'focus', 'loader')

    /* Turnstile token */

    const token = await this.#getTurnstileToken()

    /* Data */

    const values = this.getValues()

    const data: ServerlessActionData = {
      id: this.id,
      action: this.action,
      inputs: {
        ...values,
        turnstile: {
          value: token,
          type: 'hidden'
        }
      }
    }

    /* Request */

    try {
      const resp = await fetch(`https://alanizcreative.com/api/${this.action}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      })

      if (!resp.ok) {
        throw new ResponseError('Action failed', resp)
      }

      if (this.action.startsWith('password')) {
        window.location.reload()
        return
      }

      this.#displayResult(
        'success',
        loader,
        this.successTitle,
        this.successText
      )

      this.clear()
    } catch (error) {
      let errorTitle: string | undefined
      let errorText: string | undefined

      if (error instanceof ResponseError) {
        const json = await error.response.json() as { error: string }

        errorTitle = json.error
        errorText = ''
      }

      this.#displayResult(
        'error',
        loader,
        errorTitle,
        errorText
      )
    }
  }
}

/* Register */

customElements.define('ac-form', Form)
