/**
 * Components - Skip Link
 */

/**
 * Output link to main landmark.
 *
 * @return {string} HTMLAnchorElement
 */
const SkipLink = (): string => {
  return /* html */`
    <a
      href="#main"
      class="skip-link button button-sharp button-secondary b-all bg-background-light b-radius-l"
    >
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLink }
