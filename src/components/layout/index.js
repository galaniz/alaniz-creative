"use strict";
/**
 * Render - layout
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const data_1 = require("../../vars/data");
const enums_1 = require("../../vars/enums");
const utils_1 = require("../../utils");
const layout = async ({ meta = {}, content = '', style = '', PurgeCSS }) => {
    /* Assets link */
    const assetsLink = `${(0, utils_1.getPermalink)()}assets/`;
    /* Title */
    const title = (meta?.title !== undefined && meta?.title !== '' ? `${meta.title} | ` : '') + enums_1.enumSite.title;
    /* Description */
    const description = meta?.description !== undefined && meta?.description !== '' ? meta.description : enums_1.enumSite.meta.description;
    /* Image */
    const image = meta?.image !== undefined && meta?.image !== '' ? `${assetsLink}${meta.image}` : `${assetsLink}${enums_1.enumSite.meta.image}`;
    /* Url */
    const url = meta?.url !== undefined && meta?.url !== '' ? meta.url : '';
    /* Canonical */
    const canonical = meta?.canonical !== undefined && meta?.canonical !== '' ? `<link rel="canonical" href="${meta.canonical}">` : '';
    /* Prev */
    const prev = meta?.prev !== undefined ? `<link rel="prev" href="${meta.prev}">` : '';
    /* Next */
    const next = meta?.next !== undefined ? `<link rel="next" href="${meta.next}">` : '';
    /* No index */
    let noIndex = meta?.noIndex !== undefined ? meta.noIndex : false;
    if (data_1.envData.dev) {
        noIndex = true;
    }
    /* Preload font links */
    const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/larsseit.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="${assetsLink}fonts/larsseit-medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  `;
    /* Script data */
    let script = '';
    if (Object.keys(data_1.scriptData).length > 0) {
        const scriptJSON = JSON.stringify(data_1.scriptData);
        script = `
      <script>
        var namespace = '${enums_1.enumNamespace}';
        var ${enums_1.enumNamespace} = ${scriptJSON};
      </script>
    `;
    }
    /* Clear script data */
    Object.keys(data_1.scriptData).forEach(k => delete data_1.scriptData[k]); // eslint-disable-line @typescript-eslint/no-dynamic-delete
    /* Output */
    const output = `
    <!DOCTYPE html>
    <html lang="en" id="${enums_1.enumNamespace}" data-root>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        ${preloadFonts}
        ${noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
        <meta name="description" content="${description}">
        ${canonical}
        ${prev}
        ${next}
        <meta name="image" content="${image}">
        <meta property="og:url" content="${url}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${image}">
        <meta content="summary_large_image" property="twitter:card">
        <style>
          @media (prefers-reduced-motion: reduce) {
            .reduce-motion-show {
              display: block;
            }

            .reduce-motion-hide {
              display: none;
            }
          }
        </style>
        *|CSS|*
        ${style !== '' ? `<style>${style}</style>` : ''}
        <link rel="apple-touch-icon" sizes="180x180" href="${assetsLink}favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetsLink}favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetsLink}favicon/favicon-16x16.png">
        <link rel="manifest" href="${assetsLink}favicon/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="${enums_1.enumColors.foreground.base}">
        <meta name="msapplication-TileColor" content="${enums_1.enumColors.foreground.base}">
        <meta name="theme-color" content="${enums_1.enumColors.foreground.base}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${enums_1.enumNamespace} no-js l-flex l-flex-column">
        ${content}
        ${script}
        <script type="module" src="${assetsLink}js/${enums_1.enumNamespace}.js"></script>
      </body>
    </html>
  `;
    /* Purge unused css */
    let cssOutput = `<link rel="stylesheet" href="${assetsLink}css/${enums_1.enumNamespace}.css" media="all">`;
    if (data_1.envData.build && PurgeCSS !== undefined) {
        const purge = await new PurgeCSS().purge({
            content: [
                {
                    raw: output,
                    extension: 'html'
                }
            ],
            css: [
                `./site/assets/css/${enums_1.enumNamespace}.css`
            ],
            safelist: [
                'o-form__error',
                'l-flex',
                'l-gap-margin-4xs',
                'l-padding-top-3xs',
                't-line-height-0',
                'l-width-xs',
                'l-height-s',
                't-s',
                't-weight-medium'
            ],
            dynamicAttributes: [
                'data-open',
                'data-overflow',
                'data-show-items',
                'data-show',
                'data-visible',
                'data-state',
                'data-using-mouse',
                'data-no-scroll',
                'data-hide'
            ]
        });
        if (purge.length !== 0) {
            cssOutput = `<style>${purge[0].css}</style>`;
        }
    }
    /* Output */
    return output.replace('*|CSS|*', cssOutput);
};
/* Exports */
exports.default = layout;
