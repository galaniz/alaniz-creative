"use strict";
/**
 * Render - card
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cards = exports.card = void 0;
/* Imports */
const enums_1 = require("../../vars/enums");
const container_1 = __importDefault(require("../container"));
const column_1 = __importDefault(require("../column"));
const rich_text_1 = __importDefault(require("../rich-text"));
const image_1 = __importDefault(require("../image"));
const _card = ({ internalLink, headingLevel, type, index }) => {
    const { title = '', slug = '', hero } = internalLink;
    /* Title, image and slug required */
    if (title === '' || hero === undefined || slug === '') {
        return '';
    }
    /* Alternating or cascading */
    const ac = type === 'alternating' || type === 'cascading';
    /* Parents */
    const parents = [
        {
            renderType: 'card',
            internalLink
        }
    ];
    /* Text */
    let headingStyle = 'h4';
    let subText = '';
    let textClasses = '';
    if (ac) {
        headingStyle = 'h2';
        textClasses = `l-padding-top-m l-padding-top-l-m ${index % 2 !== 0 ? 'l-margin-right-auto' : 'l-margin-left-auto'}`;
    }
    else {
        textClasses = ' l-padding-top-2xs l-padding-top-m-m';
    }
    const heading = (0, rich_text_1.default)({
        args: {
            tag: `h${headingLevel}`,
            headingStyle,
            content: title,
            classes: 't-theme-main'
        },
        parents
    });
    if (internalLink.contentType === 'work' && internalLink?.category !== undefined) {
        subText = (0, rich_text_1.default)({
            args: {
                tag: 'p',
                textStyle: 'xs',
                classes: 'l-padding-top-3xs',
                content: '<span class="a11y-visually-hidden">Categories: </span>' + internalLink.category.map((cat) => {
                    return cat.title;
                }).join(' + ')
            }
        });
    }
    const text = `
    <div${textClasses !== '' ? ` class="${textClasses}"` : ''} data-text>
      ${heading}
      ${subText}
    </div>
  `;
    /* Image */
    const media = (0, image_1.default)({
        args: {
            image: hero.image,
            border: hero.border
        },
        parents
    });
    /* Output */
    return text + media;
};
const card = (props = { args: {} }) => {
    const { args = {} } = props;
    const { headingLevel = 3, type = 'minimal', internalLink, index = 0 } = args;
    /* Alternating or cascading */
    const ac = type === 'alternating' || type === 'cascading';
    /* Classes */
    let classes = 'l-flex l-flex-column';
    /* Type classes */
    if (ac) {
        classes += ' l-align-center';
    }
    /* Inner content */
    let content = '';
    let blob = '';
    let themeColor = '';
    if (internalLink !== undefined) {
        const { svg, theme } = internalLink;
        /* Blob svg */
        if (ac && svg?.blob !== undefined) {
            const reverse = index % 2 !== 0;
            const path = enums_1.enumBlobs[svg.blob].path;
            blob = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 800"
          aria-hidden="true"
          focusable="false"
          role="img"
          class="o-blob l-absolute l-top-0 l-left-0 l-right-0 l-margin-auto"
          data-reverse="${reverse.toString()}"
        >
          <path
            d="${path}"
            fill="none"
            stroke="var(--theme-main)"
            stroke-opacity="0.5"
            stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      `;
        }
        /* Theme color */
        if (theme !== undefined) {
            themeColor = theme.main.dark;
        }
        /* Card content */
        content = _card({
            internalLink,
            headingLevel,
            type,
            index
        });
    }
    /* Column */
    const columnArgs = {
        args: {
            tag: 'li'
        }
    };
    if (type === 'minimal') {
        columnArgs.args.widthSmall = '1-2';
    }
    if (ac) {
        columnArgs.args.attr = `data-type="${type.charAt(0)}"`;
        columnArgs.args.classes = 'o-card l-relative l-padding-top-xl l-padding-bottom-xl l-padding-top-3xl-m l-padding-bottom-3xl-m';
    }
    if (themeColor !== '') {
        columnArgs.args.style = `--theme-main:${themeColor}`;
    }
    const cardColumn = (0, column_1.default)(columnArgs);
    /* Output */
    return {
        start: `
      ${cardColumn.start}
      ${blob}
      <div class="l-relative l-overflow-hidden e-transition-quad e-translate e-scale">
        <div class="${classes}">${content}
    `,
        end: `
        </div>
      </div>
      ${cardColumn.end}
    `
    };
};
exports.card = card;
const cards = (props = { args: {} }) => {
    const { args = {} } = props;
    const { content = '', type = 'minimal', length = 0 } = args;
    const containerArgs = {
        args: {
            tag: 'ul'
        }
    };
    if (type === 'minimal') {
        containerArgs.args.layout = 'row';
        containerArgs.args.gap = 'm';
        containerArgs.args.gapLarge = 'l';
    }
    if (type === 'cascading') {
        const widow = length % 3 === 2;
        containerArgs.args.layout = 'row';
        containerArgs.args.attr = `data-widow="${widow.toString()}"`;
    }
    const cardsContainer = (0, container_1.default)(containerArgs);
    return (cardsContainer.start +
        content +
        cardsContainer.end);
};
exports.cards = cards;
