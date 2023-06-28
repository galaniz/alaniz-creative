/**
 * Render - wave separator
 */

/**
 * Function - output wave separator
 *
 * @return {string} HTML - div
 */

const waveSeparator = (): string => {
  const width = 102
  const height = 12

  /* Output */

  return `
    <div class="l-relative l-max-height-4xl">
      <div style="padding-top:${(height / width) * 100}%"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
        class="l-absolute l-top-0 l-left-0 l-width-100-pc l-height-100-pc"
        aria-hidden="true"
        focusable="false"
        role="img"
      >
        <path
          d="m101.77,4.62c-18.28-9.87-34.42,1.06-47.08,2.43-22.54,2.44-23.62-4.33-36.08-4.33C7.81,2.72,1.75,8.12.48,11.82"
          fill="none"
          stroke="var(--theme-main)"
          stroke-opacity="0.5"
          stroke-width="1"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  `
}

/* Exports */

export default waveSeparator
