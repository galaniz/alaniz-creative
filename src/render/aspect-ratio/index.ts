/**
 * Render - aspect ratio
 */

/**
 * Function - output aspect ratio container
 *
 * @param {object} props
 * @param {object} props.args
 * @param {number} props.args.percent
 * @return {object}
 */

interface Props {
  args: {
    percent?: number
  }
  parents?: object[]
}

const aspectRatio = (props: Props = { args: {} }): Render.Return => {
  const { args = {} } = props
  const { percent = 100 } = args

  /* Output */

  return {
    start: `<div class="l-relative l-aspect-ratio-100 l-width-100-pc" style="--aspect-ratio-padding:${percent}%">`,
    end: '</div>'
  }
}

/* Exports */

export default aspectRatio
