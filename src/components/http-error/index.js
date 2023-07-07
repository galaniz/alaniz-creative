"use strict";
/**
 * Components - http error
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const get_permalink_1 = __importDefault(require("@alanizcreative/static-site-formation/src/utils/get-permalink"));
const container_1 = __importDefault(require("@alanizcreative/static-site-formation/src/layouts/container"));
const config_1 = __importDefault(require("../../config"));
const layout_1 = __importDefault(require("../layout"));
const header_1 = __importDefault(require("../header"));
const footer_1 = __importDefault(require("../footer"));
const navigations_1 = __importDefault(require("../navigations"));
const button_1 = __importDefault(require("../../objects/button"));
/**
 * Function - output http error page (404 or 500)
 *
 * @param {number} type - 404 or 500
 * @return {string} HTML - html
 */
const httpError = async (type = 404) => {
    /* Text by type */
    const text = {
        404: {
            metaTitle: 'Page Not Found',
            heroText: 'Looks like nothing was found in this location.'
        },
        500: {
            metaTitle: 'Internal Server Error',
            heroText: 'Looks like we\'re experiencing an internal server problem.'
        }
    };
    const title = text[type].metaTitle;
    const heroText = text[type].heroText;
    /* Navigations */
    const navs = (0, navigations_1.default)({
        navigations: config_1.default.navigation,
        items: config_1.default.navigationItem,
        current: (0, get_permalink_1.default)(`${type}`)
    });
    /* Container and button */
    const output = {
        container: (0, container_1.default)({
            args: {
                maxWidth: 'xs',
                paddingTop: 'xl',
                paddingTopLarge: '2xl',
                paddingBottom: 'l',
                classes: 't-align-center'
            }
        }),
        button: (0, button_1.default)({
            args: {
                title: 'Homepage',
                type: 'secondary',
                iconBefore: 'arrow',
                internalLink: {
                    id: 'page--index',
                    contentType: 'page',
                    slug: 'index'
                }
            }
        })
    };
    /* Output */
    return await (0, layout_1.default)({
        meta: {
            title,
            noIndex: true
        },
        content: `
      ${(0, header_1.default)(navs)}
      <main id="main">
        ${output.container.start}
          <h1>${type}</h1>
          <p class="t l-padding-top-m l-padding-bottom-l">${heroText}</p>
          ${output.button}
        ${output.container.end}
      </main>
      ${(0, footer_1.default)(navs)}
    `
    });
};
/* Exports */
exports.default = httpError;
