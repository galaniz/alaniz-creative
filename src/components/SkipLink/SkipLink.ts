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
      class="skip-link button b-radius-l button-secondary b-all absolute bg-background-light"
    >
      Skip to main content
    </a>
  `
}

/* Exports */

export { SkipLink }
