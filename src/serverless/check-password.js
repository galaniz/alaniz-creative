/**
 * Serverless - send form
 */

/* Imports */

import escape from 'validator/es/lib/escape'

/**
 * Function - 
 *
 * @param {object} args
 * @param {object} args.inputs
 * @param {object} args.env
 * @return {object}
 */

const checkPassword = ({ inputs, env }) => {
  /* Password value */

  let password = ''

  Object.keys(inputs).forEach((name) => {
    const input = inputs[name]
    const inputType = input.type

    let inputValue = input.value

    /* Escape value */

    if (Array.isArray(inputValue)) {
      inputValue = inputValue.map(v => escape(v + ''))
      inputValue = inputValue.join('<br>')
    } else {
      inputValue = escape(input.value + '')
    }

    /* Password */

    if (inputType === 'password' && inputValue) {
      password = inputValue
    }
  })

  /* Wrong password */

  if (!password || password !== env.PASSWORD) {
    return {
      error: {
        message: 'Incorrect credentials',
        code: 400
      }
    }
  }

  /* Success */

  return {
    success: {
      message: 'Correct credentials',
      headers: {
        'Set-Cookie': `acp_set=true; path=/`
      }
    }
  }
}

/* Exports */

export default checkPassword
