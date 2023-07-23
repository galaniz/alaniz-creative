import config from '../../src/config'
import ajax from '@alanizcreative/static-site-formation/lib/serverless/ajax'
const render = async ({ request, env }) => { return await ajax({ request, env, siteConfig: config }) }
export const onRequestPost = [render]
