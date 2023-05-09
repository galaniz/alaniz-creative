/**
 * Data - Initialize
 */

/* Imports */

import { writeFile, mkdir } from 'node:fs/promises'
import render from '../src/render'

/* Get and render json data */

module.exports = async (): Promise<object[]> => {
  try {
    /* Output */

    return await render({
      onRenderEnd: async ({ jsonData, serverlessRoutes = [], redirects = [] }) => {
        if (jsonData) {
          const jsonDataKeys = Object.keys(jsonData)

          for (let i = 0; i < jsonDataKeys.length; i++) {
            const json = jsonData[jsonDataKeys[i]]

            await writeFile(`./src/json/${json.name}`, json.data)

            console.info(`Successfully wrote ${json.name}`)
          }
        }

        if (serverlessRoutes.length) {
          for (let i = 0; i < serverlessRoutes.length; i++) {
            const path: string = serverlessRoutes[i]
            const pathDepth = path.match(/([/])/g) || []

            let serverlessPath = ''
        
            for (let j = 0; j < pathDepth.length; j++) {
              serverlessPath += '../'
            }
        
            const content = `import reload from '${serverlessPath}src/serverless/reload'; const render = async ({ request, env }) => { return await reload({ request, env }) }; export const onRequestGet = [render];`
        
            await mkdir(`./functions${path}`, { recursive: true })
        
            await writeFile(`./functions${path}index.js`, content)
        
            console.info(`Successfully wrote ./functions${path}index.js`)
          }
        }
        
        if (redirects.length) {
          let redirectsData = ''
        
          redirects.forEach((r) => {
            const { content = [] } = r
        
            if (content.length) {
              redirectsData += content.join('\n')
            }
          })
        
          if (redirectsData) {
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
