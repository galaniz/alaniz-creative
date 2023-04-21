/**
 * Utils - get all file paths
 */

/* Imports */

const { readdir } = require('node:fs/promises')
const { join } = require('node:path')

/**
 * Function - asynchronous recurse directory to get all file paths in it
 *
 * @param {string} dir
 * @return {array<string>}
 */

const getAllFilePaths = async function* (dir) {
  const files = await readdir(dir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      yield* await getAllFilePaths(join(dir, file.name));
    } else {
      yield join(dir, file.name)
    }
  }
}

/* Exports */

module.exports = getAllFilePaths
