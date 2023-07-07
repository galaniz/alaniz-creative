"use strict";
/**
 * Components - layout
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const get_permalink_1 = __importDefault(require("@alanizcreative/static-site-formation/src/utils/get-permalink"));
const config_1 = __importDefault(require("../../config"));
const layout = async ({ meta = {}, content = '', style = '', PurgeCSS }) => {
    /* Assets link */
    const assetsLink = `${(0, get_permalink_1.default)()}assets/`;
    /* Namespace */
    const ns = config_1.default.namespace;
    /* Title */
    const title = (meta?.title !== undefined && meta?.title !== '' ? `${meta.title} | ` : '') + config_1.default.title;
    /* Description */
    const description = meta?.description !== undefined && meta?.description !== '' ? meta.description : config_1.default.meta.description;
    /* Image */
    const image = meta?.image !== undefined && meta?.image !== '' ? `${assetsLink}${meta.image}` : `${assetsLink}${config_1.default.meta.image}`;
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
    if (config_1.default.env.dev) {
        noIndex = true;
    }
    /* Preload font links */
    const preloadFonts = `
    <link rel="preload" href="${assetsLink}fonts/larsseit.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="${assetsLink}fonts/larsseit-medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
  `;
    /* Script data */
    let script = '';
    if (Object.keys(config_1.default.script).length > 0) {
        const scriptJSON = JSON.stringify(config_1.default.script);
        script = `
      <script>
        var namespace = '${ns}';
        var ${ns} = ${scriptJSON};
      </script>
    `;
    }
    /* Clear script data */
    Object.keys(config_1.default.script).forEach(k => delete config_1.default.script[k]); // eslint-disable-line @typescript-eslint/no-dynamic-delete
    /* Theme color */
    const theme = config_1.default.theme;
    /* Output */
    const output = `
    <!DOCTYPE html>
    <html lang="en" id="${ns}" data-root>
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="${theme}">
        <meta name="msapplication-TileColor" content="${theme}">
        <meta name="theme-color" content="${theme}">
        <meta name="format-detection" content="telephone=no">
      </head>
      <body class="${ns} no-js l-flex l-flex-column">
        ${content}
        ${script}
        <script type="module" src="${assetsLink}js/${ns}.js"></script>
      </body>
    </html>
  `;
    /* Purge unused css */
    let cssOutput = `<link rel="stylesheet" href="${assetsLink}css/${ns}.css" media="all">`;
    if (config_1.default.env.build && PurgeCSS !== undefined) {
        const purge = await new PurgeCSS().purge({
            content: [
                {
                    raw: output,
                    extension: 'html'
                }
            ],
            css: [
                `./site/assets/css/${ns}.css`
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
