"use strict";
/**
 * Components - single content
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const get_archive_link_1 = __importDefault(require("@alanizcreative/static-site-formation/src/utils/get-archive-link"));
const container_1 = __importDefault(require("@alanizcreative/static-site-formation/src/layouts/container"));
const rich_text_1 = __importDefault(require("@alanizcreative/static-site-formation/src/text/rich-text"));
const wave_separator_1 = __importDefault(require("../../components/wave-separator"));
const button_1 = __importDefault(require("../../objects/button"));
const cards_1 = require("../../objects/cards");
const singleContent = ({ contentType = 'work', related = [] }) => {
    /* Related required */
    if (related.length === 0) {
        return '';
    }
    /* Related content */
    const relatedCards = related.map((r) => {
        const c = (0, cards_1.card)({
            args: {
                headingLevel: 3,
                internalLink: r
            }
        });
        return c.start + c.end;
    }).join('');
    if (relatedCards === '') {
        return '';
    }
    /* Content output */
    const content = {
        title: (0, rich_text_1.default)({
            args: {
                headingStyle: 'h3',
                tag: 'h2',
                content: 'Explore more work'
            }
        }),
        button: ''
    };
    /* Archive title and link */
    const archiveData = (0, get_archive_link_1.default)(contentType);
    if (archiveData.title !== '' && archiveData.link !== '') {
        content.button = (0, button_1.default)({
            args: {
                title: `All ${archiveData.title.toLowerCase()}`,
                iconBefore: 'arrow',
                type: 'secondary',
                justify: 'center',
                link: archiveData.link
            }
        });
    }
    /* Containing output */
    const containers = {
        wave: (0, container_1.default)({
            args: {
                paddingTop: 'xl',
                paddingTopLarge: '2xl',
                paddingBottom: 'l',
                classes: 'l-breakout'
            }
        }),
        section: (0, container_1.default)({
            args: {
                maxWidth: 's',
                tag: 'section'
            }
        }),
        title: (0, container_1.default)({
            args: {
                paddingBottom: 'm',
                paddingBottomLarge: 'l'
            }
        }),
        cards: (0, container_1.default)({
            args: {
                paddingBottom: 'l',
                paddingBottomLarge: '2xl',
                layout: 'row',
                gap: 'm',
                gapLarge: 'l',
                tag: 'ul'
            }
        })
    };
    /* Output */
    return `
    ${containers.wave.start}
    ${(0, wave_separator_1.default)()}
    ${containers.wave.end}
    ${containers.section.start}
      ${containers.title.start}
        ${content.title}
      ${containers.title.end}
      ${containers.cards.start}
        ${relatedCards}
      ${containers.cards.end}
      ${content.button}
    ${containers.section.end}
  `;
};
/* Exports */
exports.default = singleContent;
