/**
 * Schema - Validate Cli
 */

import { print } from '@alanizcreative/formation-static/utils/print/print.js'
import { validateContent } from './schemaValidate.js'

/* Validate content files */

try {
  await validateContent()
  print('[AC] Content is valid', '', 'success')
} catch (error) {
  print('[AC] Content is invalid', error instanceof Error ? error.message : '', 'error')
  process.exitCode = 1
}
