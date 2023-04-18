/**
 * Utils - get image
 */

/**
 * Function - get responsive image output
 *
 * @param {object} args {
 *  @prop {object} data
 *  @prop {string} classes
 *  @prop {string} attr
 *  @prop {string|integer} width
 *  @prop {string|integer} height
 *  @prop {boolean} returnAspectRatio
 * }
 * @return {string} HTML - img
 */

const getImage = ({
  data,
  classes = '',
  attr = '',
  width = 'auto',
  height = 'auto',
  returnAspectRatio = false,
  lazy = true,
  max = 1600
}) => {
  /* Data required */

  if (!data) {
    return ''
  }

  const {
    base,
    alt = "",
    width: naturalWidth,
    height: naturalHeight
  } = data

  /* Dimensions */

  const aspectRatio = naturalHeight / naturalWidth
  const aspectRatioReverse = naturalWidth / naturalHeight

  let w = naturalWidth
  let h = naturalHeight

  if (width !== 'auto') {
    w = width
    h = height === 'auto' ? height * aspectRatio : height
  }

  if (height !== 'auto') {
    h = height
    w = width === 'auto' ? width * aspectRatioReverse : width
  }

  /* Src and sizes attributes */

  const src = `/assets/img/${base}.webp`
  const sizes = `(min-width: ${w / 16}rem) ${w / 16}rem, 100vw`

  let srcset = [200, 400, 600, 800, 1200, 1600, 2000]

  srcset = srcset.filter(s => s < w && s <= max)

  if (w <= max) {
    srcset.push(w)
  }

  srcset = srcset.map(s => {
    return `/assets/img/${base}${s !== naturalWidth ? `@${s}` : ''}.webp ${s}w`
  })

  /* Output */

  const output = `
    <img${classes ? ` class="${classes}"` : ''} alt="${alt}" src="${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}"${attr ? ` ${attr}` : ''}${lazy ? ' loading="lazy"' : ''}>
  `

  if (returnAspectRatio) {
    return {
      output,
      aspectRatio
    }
  }

  return output
}

/* Exports */

module.exports = getImage
