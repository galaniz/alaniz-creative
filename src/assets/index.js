/**
 * Site js
 */

/* Imports */

import { setSettings, setElements, usingMouse } from '@alanizcreative/formation/src/utils'
import Nav from '@alanizcreative/formation/src/components/nav'
import Video from '@alanizcreative/formation/src/objects/video'
import SendForm from '@alanizcreative/formation/src/objects/form/send'

/**
 * Namespace
 *
 * @type {string}
 */

const ns = window.namespace

/**
 * Namespace object - back end info
 *
 * @type {object}
 */

const n = window[ns]

/**
 * Store DOM elements from setElements
 *
 * @type {object}
 */

const el = {}

/**
 * Props and selectors for setElements
 *
 * @type {array<object>}
 */

const meta = [
  {
    prop: 'nav',
    selector: '.c-nav',
    items: [
      {
        prop: 'navList',
        selector: '.c-nav__list'
      },
      {
        prop: 'navOverflow',
        selector: '.c-nav-overflow'
      },
      {
        prop: 'navOverflowList',
        selector: '.c-nav-overflow__list'
      },
      {
        prop: 'navItems',
        selector: '.c-nav__item[data-depth="0"]',
        all: true
      },
      {
        prop: 'navLinks',
        selector: '.c-nav__link',
        all: true
      },
      {
        prop: 'navOpen',
        selector: '.c-nav__open'
      },
      {
        prop: 'navClose',
        selector: '.c-nav__close'
      },
      {
        prop: 'navOverlay',
        selector: '.c-nav__overlay'
      }
    ]
  },
  {
    prop: 'forms',
    selector: '.js-send-form',
    all: true,
    array: true
  },
  {
    prop: 'video',
    selector: '.o-video',
    all: true,
    array: true
  }
]

/**
 * Function - initialize functions and classes
 *
 * @return {void}
 */

const initialize = () => {
  /* Set settings object */

  setSettings()

  /* Set elements object */

  setElements(document, meta, el)

  /* Check if using mouse */

  usingMouse()

  /* Navigation */

  if (el.nav) {
    const nav = () => {
      const itemSelector = '.c-nav__item[data-depth="0"]'

      return new Nav({
        nav: el.nav,
        list: el.navList,
        overflow: el.navOverflow,
        overflowList: el.navOverflowList,
        items: el.navItems,
        itemSelector,
        links: el.navLinks,
        open: el.navOpen,
        close: el.navClose,
        overlay: el.navOverlay,
        delay: {
          open: 300,
          close: 300
        }
      })
    }

    nav()
  }

  /* Forms */

  if (n && el.forms.length) {
    /* Default result messages */

    const getDefaultMessages = (id) => {
      const messages = {
        error: {
          primary: 'Sorry, there is a problem with the service.',
          secondary: 'Try again later.'
        },
        success: {
          primary: 'Success!',
          secondary: ''
        }
      }

      if (Object.getOwnPropertyDescriptor(n, `form-${id}`)) {
        const ff = n[`form-${id}`]

        if (Object.getOwnPropertyDescriptor(ff, 'successMessage')) {
          if (ff.successMessage.primary) {
            messages.success.primary = ff.successMessage.primary
          }

          if (ff.successMessage.secondary) {
            messages.success.secondary = ff.successMessage.secondary
          }
        }

        if (Object.getOwnPropertyDescriptor(ff, 'errorMessage')) {
          if (ff.errorMessage.primary) {
            messages.error.primary = ff.errorMessage.primary
          }

          if (ff.errorMessage.secondary) {
            messages.error.secondary = ff.errorMessage.secondary
          }
        }
      }

      return messages
    }

    /* Form instantiation */

    const sendForm = (form) => {
      /* Store instance */

      let instance = null

      /* Get elements */

      const meta = [
        {
          prop: 'inputs',
          selector: '.js-input',
          all: true
        },
        {
          prop: 'submit',
          selector: '.js-submit'
        },
        {
          prop: 'loaders',
          selector: '.o-loader',
          all: true
        },
        {
          prop: 'errorSummary',
          selector: '.o-form-error__summary',
          items: [
            {
              prop: 'errorSummaryList',
              selector: 'ul'
            }
          ]
        },
        {
          prop: 'error',
          selector: '.o-form-result__negative',
          items: [
            {
              prop: 'errorPrimary',
              selector: '.o-form-result__primary'
            },
            {
              prop: 'errorSecondary',
              selector: '.o-form-result__secondary'
            }
          ]
        },
        {
          prop: 'success',
          selector: '.o-form-result__positive',
          items: [
            {
              prop: 'successPrimary',
              selector: '.o-form-result__primary'
            },
            {
              prop: 'successSecondary',
              selector: '.o-form-result__secondary'
            }
          ]
        }
      ]

      const f = {}

      setElements(form, meta, f)

      /* Variables */

      const id = form.id

      /* Messages */

      const messages = getDefaultMessages(id)

      /* Action */

      const action = form.getAttribute('data-action') || 'send-form'

      /* Args */

      const args = {
        id,
        form,
        url: n.sendUrl,
        inputs: f.inputs,
        submit: f.submit,
        loaders: f.loaders,
        groupClass: 'o-form__group',
        fieldClass: 'o-form__field',
        labelClass: 'o-form__label',
        data: { action },
        errorTemplate: `
          <span class='o-form__error l-flex l-gap-margin-4xs l-padding-top-3xs' id='%id'>
            <span class='t-line-height-0'>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="l-width-xs l-height-s" aria-label="Error" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg"><path d="m2.6,17.08c-.24,0-.41-.1-.53-.3-.12-.2-.12-.4-.01-.59L9.48,3.4c.12-.19.3-.29.52-.29s.4.1.52.29l7.42,12.79c.11.19.11.39-.01.59-.12.2-.3.3-.53.3H2.6Zm7.46-8.77c-.14,0-.25.05-.34.14-.09.09-.14.2-.14.32v3.6c0,.14.05.25.14.34.09.09.2.14.34.14s.25-.05.34-.14c.09-.09.14-.2.14-.34v-3.6c0-.12-.05-.23-.15-.32s-.21-.14-.33-.14h0Zm0,6.58c.15,0,.28-.05.38-.16.1-.1.15-.23.15-.39,0-.14-.05-.26-.16-.35-.1-.1-.23-.15-.36-.15-.15,0-.28.05-.37.15-.1.1-.15.22-.15.38,0,.14.05.26.15.36.1.1.22.16.37.16Z" fill="currentcolor"/></svg>
            </span>
            <span class='t-line-height-0'>
              <span class='t-s t-weight-medium' id='%id-text'>%message</span>
            </span>
          </span>
        `,
        result: {
          error: {
            summary: {
              container: f.errorSummary,
              list: f.errorSummaryList
            },
            container: f.error,
            primary: f.errorPrimary,
            secondary: f.errorSecondary,
            message: messages.error
          },
          success: {
            container: f.success,
            primary: f.successPrimary,
            secondary: f.successSecondary,
            message: messages.success
          }
        },
        onSuccess () {
          if (action !== 'check-password') {
            return
          }

          setTimeout(() => {
            window.location.reload()
          }, 500)
        },
        onError (err) {
          this.result.error.message = getDefaultMessages(id).error

          if (action !== 'check-password') {
            return
          }

          if (err.status === 400) {
            this.result.error.message.primary = 'Incorrect password'
          }
        }
      }

      instance = new SendForm(args)

      return instance
    }

    el.forms.forEach((form) => {
      sendForm(form)
    })
  }

  /* Video */

  if (el.video.length) {
    const video = (args) => {
      return new Video(args)
    }

    el.video.forEach(v => {
      const meta = [
        {
          prop: 'video',
          selector: 'video'
        },
        {
          prop: 'source',
          selector: 'source',
          all: true,
          array: true
        },
        {
          prop: 'play',
          selector: '.o-video__play'
        },
        {
          prop: 'pause',
          selector: '.o-video__pause'
        },
        {
          prop: 'loader',
          selector: '.o-video__loader'
        },
        {
          prop: 'error',
          selector: '.o-video__error'
        }
      ]

      const vv = {}

      setElements(v, meta, vv)

      const args = {
        container: v,
        video: vv.video,
        source: vv.source,
        play: vv.play,
        pause: vv.pause,
        loader: vv.loader,
        error: vv.error,
        url: v.getAttribute('data-src').split(',')
      }

      video(args)
    })
  }
}

initialize()
