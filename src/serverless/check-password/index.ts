/**
 * Serverless - check password
 */

/* Imports */

import escape from 'validator/es/lib/escape'

/**
 * Function - escape and check password against environment variable
 *
 * @param {object} args
 * @param {object} args.inputs
 * @param {object} args.env
 * @return {object}
 */

const checkPassword = ({ inputs, env }: FRM.AjaxActionArgs): FRM.AjaxActionReturn => {
  /* Password value */

  let password = ''

  Object.keys(inputs).forEach((name) => {
    const input = inputs[name]
    const inputType = input.type
    const inputValue = input.value

    let inputValueStr = ''

    /* Escape value */

    if (Array.isArray(inputValue)) {
      inputValueStr = inputValue.map(v => escape(v.trim() + '')).join('')
    } else {
      inputValueStr = escape(inputValue.trim() + '')
    }

    /* Password */

    if (inputType === 'password' && inputValueStr !== '') {
      password = inputValueStr
    }
  })

  /* Wrong password */

  if (password !== '' || password !== env.PASSWORD) {
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
        'Set-Cookie': 'acp_set=true; path=/'
      }
    }
  }
}

/* Exports */

export default checkPassword
