/**
 * Data - Initialize
 */

/* Imports */

import { writeFile, mkdir } from 'node:fs/promises'
import render from '../src/render'

/* Get and render json data */

interface RenderArgs {
  jsonData: object
  serverlessRoutes: string[]
  redirects: string[]
}

interface JsonObj {
  name: string
  data: string
}

module.exports = async (): Promise<object[]> => {
  try {
    /* Output */

    return await render({
      onRenderEnd: async ({ jsonData = {}, serverlessRoutes = [], redirects = [] }: RenderArgs): Promise<void> => {
        const jsonDataKeys = Object.keys(jsonData)

        if (jsonDataKeys.length > 0) {
          for (let i = 0; i < jsonDataKeys.length; i++) {
            const json: JsonObj = jsonData[jsonDataKeys[i]]

            await writeFile(`./src/json/${json.name}`, json.data)

            console.info(`Successfully wrote ${json.name}`)
          }
        }

        if (serverlessRoutes.length > 0) {
          for (let i = 0; i < serverlessRoutes.length; i++) {
            const path: string = serverlessRoutes[i]
            const pathDepth: string[] | null = path.match(/([/])/g)

            if (pathDepth === null) {
              continue
            }

            let serverlessPath = ''

            for (let j = 0; j < pathDepth.length; j++) {
              serverlessPath += '../'
            }

            const content = `import passwordProtect from '${serverlessPath}src/serverless/password-protect'; const protect = async ({ request, env, next }) => { return await passwordProtect({ request, env, next }) }; export const onRequestGet = [protect];`

            await mkdir(`./functions${path}`, { recursive: true })

            await writeFile(`./functions${path}_middleware.js`, content)

            console.info(`Successfully wrote ./functions${path}_middleware.js`)
          }
        }

        if (redirects.length > 0) {
          let redirectsData = ''

          redirects.forEach((r) => {
            redirectsData += `${r}\n`
          })

          if (redirectsData !== '') {
            await writeFile('./site/_redirects', redirectsData)

            console.info('Successfully wrote ./site/_redirects')
          }
        }
      }
    })
  } catch (error) {
    console.error('Error rendering site: ', error)

    return [{
      slug: '',
      output: ''
    }]
  }
}
