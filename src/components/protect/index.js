"use strict";
/**
 * Render - protect
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const uuid_1 = require("uuid");
const layout_1 = __importDefault(require("../layout"));
const container_1 = __importDefault(require("../container"));
const form_1 = __importDefault(require("../form"));
const field_1 = __importDefault(require("../field"));
const lock_1 = __importDefault(require("../svg/lock"));
/**
 * Function - output password protected page
 *
 * @return {string} HTML - html
 */
const protect = async () => {
    /* Title */
    const title = 'This content is protected';
    /* Text */
    const text = 'To view, please enter the password.';
    /* Container and form */
    const output = {
        container: (0, container_1.default)({
            args: {
                maxWidth: 'xs',
                paddingTop: '2xl',
                paddingBottom: '3xl',
                classes: 'l-width-1-1'
            }
        }),
        form: (0, form_1.default)({
            args: {
                id: (0, uuid_1.v4)(),
                action: 'check-password',
                submitLabel: 'Go',
                row: 's',
                align: 's'
            }
        }),
        field: (0, field_1.default)({
            args: {
                type: 'password',
                name: 'password',
                label: 'Password',
                required: true,
                emptyErrorMessage: 'Enter a password',
                width: '3-4',
                widthBreakpoint: 's',
                grow: true
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
      <main id="main" class="l-flex l-align-center l-min-height-100-vh">
        ${output.container.start}
          <div class="l-flex l-width-l l-height-l l-width-xl-m l-height-xl-m b-radius-100-pc bg-muted t-sharp">
            ${(0, lock_1.default)('l-width-m l-height-m l-width-l-m l-height-l-m l-margin-auto')}
          </div>
          <h1 class="l-padding-top-m">${title}</h1>
          <p class="t-l t-line-height-150-pc l-padding-top-xs l-padding-bottom-m l-padding-bottom-l-m">${text}</p>
          ${output.form.start}
            ${output.field}
          ${output.form.end}
        ${output.container.end}
      </main>
    `
    });
};
/* Exports */
exports.default = protect;
