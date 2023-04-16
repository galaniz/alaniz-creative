/**
 * Data - Initialize
 */

/* Imports */

const { writeFile, mkdir } = require('fs')
const render = require('../src/render')
const getLocalDataEleventy = require('../src/utils/get-local-data-eleventy')

/* Get and render json data */

module.exports = async (args = {}) => {
  try {
    /* Output */

    return render({
      ...args,
      getLocalData: getLocalDataEleventy,
      onRenderEnd: ({ jsonData, serverlessRoutes = [], redirects = [] }) => {
        if (jsonData) {
          const jsonDataKeys = Object.keys(jsonData)

          for (let i = 0; i < jsonDataKeys.length; i++) {
            const json = jsonData[jsonDataKeys[i]]

            writeFile(`./src/json/${json.name}`, JSON.stringify(json.data, null, 2), (error) => {
              if (error) {
                console.error(`Error writing ${json.name} `, error)
                return
              }

              console.log(`Successfully wrote ${json.name}`)
            })
          }
        }

        /*if (serverlessRoutes.length) {
          for (let i = 0; i < serverlessRoutes.length; i++) {
            const path = serverlessRoutes[i]
            const pathDepth = path.match(/([/])/g) || []

            let serverlessPath = ''

            for (let j = 0; j < pathDepth.length; j++) {
              serverlessPath += '../'
            }

            const content = `import reload from '${serverlessPath}src/serverless/reload'; const render = async ({ request, env }) => { return await reload({ request, env }) }; export const onRequestGet = [render];`

            mkdir(`./functions${path}`, { recursive: true }, (error) => {
              if (error) {
                console.error(`Error writing ./functions${path} `, error)
                return
              }

              writeFile(`./functions${path}index.js`, content, (err) => {
                if (err) {
                  console.error(`Error writing ./functions${path}index.js `, err)
                  return
                }

                console.log(`Successfully wrote ./functions${path}index.js`)
              })
            })
          }
        }*/

        /*if (redirects.length) {
          let redirectsData = ''

          redirects.forEach((r) => {
            const { redirect } = r.fields

            if (redirect.length) {
              redirectsData += redirect.join('\n')
            }
          })

          if (redirectsData) {
            writeFile('./site/_redirects', redirectsData, (err) => {
              if (err) {
                console.error('Error writing ./site/_redirects ', err)
                return
              }

              console.log('Successfully wrote ./site/_redirects')
            })
          }
        }*/
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
