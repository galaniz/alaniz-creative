"use strict";
/**
 * Objects - button
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const get_link_1 = __importDefault(require("@alanizcreative/static-site-formation/src/utils/get-link"));
const external_link_1 = __importDefault(require("../../svg/external-link"));
const arrow_back_1 = __importDefault(require("../../svg/arrow-back"));
const button = (props = { args: {} }) => {
    const { args = {} } = props;
    const { title = '', internalLink, externalLink = '', type = 'main', size = '', justify = '', richText = false, paddingTop = '', paddingBottom = '', newTab = false, iconBefore = '' } = args;
    let { link = '' } = args;
    /* Link and title required */
    if (link === '') {
        link = (0, get_link_1.default)(internalLink, externalLink);
    }
    if (link === '' || title === '') {
        return '';
    }
    /* Check if external */
    const external = (externalLink !== '' && newTab) || false;
    /* Classes */
    let linkClasses = 'o-button b-radius-l e-transition-quad';
    if (type === 'main') {
        linkClasses += ' o-button-main';
    }
    else if (type === 'secondary') {
        linkClasses += ' o-button-secondary b-all';
    }
    if (size === 'large') {
        linkClasses += ' o-button-large';
    }
    if (!external) {
        linkClasses += ' js-pt-link';
    }
    /* Icon before title */
    let iconBeforeOutput = '';
    if (iconBefore === 'arrow') {
        iconBeforeOutput = (0, arrow_back_1.default)('l-width-xs l-height-xs');
    }
    /* Icon after title */
    let iconAfterOutput = '';
    if (external) {
        iconAfterOutput = (0, external_link_1.default)('l-width-xs l-height-xs');
    }
    /* Icon attribute */
    let iconAttr = '';
    if (iconBeforeOutput !== '' || iconAfterOutput !== '') {
        iconAttr = ` data-icon="${iconBeforeOutput !== '' ? 'before' : 'after'}"`;
    }
    /* Output */
    let output = `
    <a class="${linkClasses}" href="${link}"${newTab ? ' target="_blank" rel="noreferrer"' : ''}${iconAttr}>
      ${iconBeforeOutput}
      ${title}
      ${iconAfterOutput}
    </a>
  `;
    if (richText) {
        output = `<div data-button>${output}</div>`;
    }
    if (justify !== '' || paddingTop !== '' || paddingBottom !== '') {
        const classes = [];
        if (paddingTop !== '') {
            classes.push(`l-padding-top-${paddingTop}`);
        }
        if (paddingBottom !== '') {
            classes.push(`l-padding-top-${paddingBottom}`);
        }
        if (justify !== '') {
            classes.push(`l-flex l-justify-${justify}`);
        }
        output = `<div class="${classes.join(' ')}">${output}</div>`;
    }
    return output;
};
/* Exports */
exports.default = button;
