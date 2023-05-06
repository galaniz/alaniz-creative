/**
 * Utils - resolve internal links
 */

/**
 * Function - recursively set internal props from outer data
 *
 * @param {object} data
 * @param {object} currentData
 * @param {array<string>} props
 * @return {void}
 */

const resolveInternalLinks = (
  data: object = {},
  currentData: object = {},
  props: string[] = ['internalLink']
): void => {
  Object.keys(currentData).forEach((prop) => {
    const value = currentData[prop]

    if (props.includes(prop)) {
      currentData[prop] = Array.isArray(value) ? value.map((v) => data[v]) : data[value]
    } else {
      if (value !== null && typeof value === 'object') {
        resolveInternalLinks(data, value, props)
      }
    }
  })
}

/* Exports */

export default resolveInternalLinks