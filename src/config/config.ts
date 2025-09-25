/**
 * Config
 */

/* Imports */

import type { ConfigVars, ConfigEnv } from './configTypes.js'
import type { Config } from '@alanizcreative/formation-static/config/configTypes.js'
import { setConfig } from '@alanizcreative/formation-static/config/config.js'

/**
 * Style, script, svg and template options.
 *
 * @type {ConfigVars}
 */
const configVars: ConfigVars = {
  local: false,
  svg: new Map(),
  template: new Map(),
  style: new Set(),
  noscript: new Set(),
  css: {
    in: 'src/global/global',
    out: 'css/global/global',
    replace: '',
    cache: new Map(),
    safelist: []
  },
  js: {
    in: 'lib/global/globalClient',
    out: 'js/global/globalClient'
  },
  formId: ''
}

/**
 * Base, content and render type options.
 *
 * @type {Config}
 */
const config: Config = setConfig({
  namespace: 'ac',
  source: 'local',
  title: 'Alaniz Creative',
  meta: {
    description: 'Graciela Alaniz is a designer/developer based in Toronto. She strives to create elegant, engaging and accessible digital experiences.',
    image: 'alaniz-creative-meta.png'
  },
  wholeTypes: [
    'page',
    'work',
    'taxonomy',
    'term'
  ],
  partialTypes: [
    'navigationItem',
    'navigation'
  ],
  hierarchicalTypes: [
    'page'
  ],
  typeInSlug: {
    work: 'work'
  },
  taxonomyInSlug: {
    categories: 'categories'
  },
  local: {
    dir: 'data'
  },
  filter: (config, env: ConfigEnv) => {
    config.env.dev = env.ENVIRONMENT === 'development'
    config.env.prod = env.ENVIRONMENT === 'production'
    configVars.local = env.LOCAL === 'true'

    return config
  }
})

/* Exports */

export {
  config,
  configVars
}
