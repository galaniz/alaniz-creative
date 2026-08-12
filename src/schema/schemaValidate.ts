/**
 * Schema - Validate
 */

/* Imports */

import { readdir, readFile } from 'node:fs/promises'
import { extname, basename, resolve } from 'node:path'
import { parsePage, getSchemaIssuesMessage } from './schemaParse.js'

/**
 * Content types the editing tools own, and therefore validate.
 *
 * @type {string[]}
 */
const schemaTypes: string[] = [
  'page',
  'work'
]

/**
 * Validate every editable content file against the shared schema.
 *
 * Runs as part of the build so an invalid page fails loudly here rather than
 * rendering as something subtly wrong.
 *
 * @param {string} [dir='data']
 * @return {Promise<void>}
 * @throws {Error} When any file fails validation.
 */
const validateContent = async (dir = 'data'): Promise<void> => {
  const files = await readdir(resolve(dir))
  const errors: string[] = []

  for (const file of files) {
    if (extname(file) !== '.json') {
      continue
    }

    const name = basename(file, '.json')
    const type = name.split('--')[0]

    if (!type || !schemaTypes.includes(type)) {
      continue
    }

    const contents = await readFile(resolve(dir, file), { encoding: 'utf8' })

    let data: unknown

    try {
      data = JSON.parse(contents)
    } catch {
      errors.push(`${dir}/${file}\n  the page itself: Not valid JSON`)
      continue
    }

    const { valid, issues } = parsePage(data)

    if (!valid) {
      errors.push(`${dir}/${file}\n${getSchemaIssuesMessage(issues)}`)
    }
  }

  if (errors.length) {
    throw new Error(`Content failed validation:\n\n${errors.join('\n\n')}\n`)
  }
}

/* Exports */

export { validateContent }
