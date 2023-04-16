/**
 * Utils - resolve internal links
 */

/**
 * Function - recursively set internal props from outer data
 *
 * @return {object}
 */

const resolveInternalLinks = (data = {}, currentData = {}, props = ['internalLink']) => {
  Object.keys(currentData).forEach((prop) => {
    const value = currentData[prop]

    if (props.includes(prop)) {
      currentData[prop] = data[value]
    } else {
      if (value !== null && typeof value === 'object') {
        resolveInternalLinks(data, value, props)
      }
    }
  })
}

/* Exports */

module.exports = resolveInternalLinks
