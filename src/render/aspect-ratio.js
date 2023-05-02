/**
 * Render - aspect ratio
 */

/**
 * Function - output aspect ratio container
 *
 * @param {object} args {
 *  @prop {number} percent
 * }
 * @return {string} HTML - div
 */

const aspectRatio = ({ args = {} }) => {
  let { percent = 100 } = args

  /* Output */

  return {
    start: `<div class="l-relative l-aspect-ratio-100 l-width-100-pc" style="--aspect-ratio-padding:${percent}%">`,
    end: '</div>'
  }
}

/* Exports */

module.exports = aspectRatio
