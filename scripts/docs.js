/**
 * Scripts - Docs
 */

/* Imports */

import { renderMarkdownDocs } from '@alanizcreative/formation-docs/docs.js'

/* Create README */

await renderMarkdownDocs({
  include: 'src/**/*.ts',
  docsExclude: 'src/**/!(*global)Types.ts',
  docsTypes: 'src/**/*Types.ts',
  index: `
  /**
   * @file
   * title: Alaniz Creative
   * Static site for Alaniz Creative using [Formation Static](https://github.com/galaniz/formation-static).
   *
   * @example
   * title: Installation
   * shell: pnpm install --optional
   *
   * @example
   * title: Local Development
   * desc: To launch the local server at <code>http://127.0.0.1:8000/</code>:
   * shell:
   * pnpm clean
   * pnpm build
   * pnpm start
   *
   * @index
   */
  `
})
