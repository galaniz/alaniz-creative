"use strict";
/**
 * Render - navigations
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.navContainer = void 0;
/* Imports */
const navigation_1 = __importDefault(require("../navigation"));
const navigations = ({ navs = [], items = [], current = '' }) => {
    /* Navs and items required */
    if ((navs.length === 0) && (items.length === 0)) {
        return {
            main: '',
            footer: ''
        };
    }
    /* Navigation instance */
    const nav = new navigation_1.default({ navs, items });
    /* Output */
    return {
        main: nav.getOutput('main', current, {
            listClass: 'c-nav__list l-flex l-align-center l-gap-margin-m t-list-style-none l-overflow-x-auto l-overflow-y-hidden outline-tight',
            listAttr: 'role="list"',
            itemClass: 'c-nav__item e-transition',
            itemAttr: 'data-overflow-group="0"',
            linkClass: 'c-nav__link t t-weight-medium t-line-height-130-pc l-inline-flex l-padding-top-3xs l-padding-bottom-3xs l-padding-left-3xs l-padding-right-3xs l-relative l-after',
            internalLinkClass: 'js-pt-link'
        }),
        footer: nav.getOutput('footer', current, {
            listClass: 'l-flex l-flex-wrap l-gap-margin-m l-gap-margin-l-m t-list-style-none e-underline-reverse',
            listAttr: 'role="list"',
            linkClass: 't-s',
            internalLinkClass: 'js-pt-link',
            linkAttr: 'data-inline'
        })
    };
};
const navContainer = ({ navs = {}, props = {} }) => {
    const { location = '', title = '' } = props;
    if (location !== '' && title !== '') {
        const loc = location.toLowerCase().replace(/ /g, '');
        const nav = navs?.[loc] !== '' ? navs[loc] : '';
        return `<nav aria-label="${title}">${nav}</nav>`;
    }
    return '';
};
exports.navContainer = navContainer;
/* Exports */
exports.default = navigations;
