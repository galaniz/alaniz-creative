"use strict";
/**
 * Render - posts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const enums_1 = require("../../vars/enums");
const data_1 = require("../../vars/data");
const cards_1 = require("../cards");
const list_minimal_1 = require("../list-minimal");
const info_1 = __importDefault(require("../info"));
const posts = (props = { args: {} }) => {
    const { args = {} } = props;
    const { contentType = 'work', display = 1, headingLevel = 3, layout = 'cardsMinimal', nothingFound = true, // Display nothing found message
    order = 'date', id = '' } = args;
    /* Type required */
    if (contentType === '') {
        return '';
    }
    /* Content type title */
    const typeTitle = data_1.slugData.bases[contentType].title.toLowerCase();
    /* Id required if term */
    if (contentType === 'workCategory' && id === '') {
        return (0, info_1.default)(`Looks like no ${typeTitle} were found.`);
    }
    /* Layout */
    const l = enums_1.enumLayouts[layout];
    /* Check posts */
    let posts = data_1.archiveData.posts?.[contentType] !== undefined ? data_1.archiveData.posts[contentType] : [];
    if (contentType === 'workCategory') {
        posts = posts[id];
    }
    if (posts.length === 0) {
        return nothingFound ? (0, info_1.default)(`Looks like no ${typeTitle} were found.`) : '';
    }
    /* Order */
    posts.sort((a, b) => {
        if (order === 'date' && a?.date !== undefined && b?.date !== undefined) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA > dateB) {
                return -1;
            }
            if (dateA < dateB) {
                return 1;
            }
        }
        return 0;
    });
    /* Limit */
    if (display !== -1) {
        posts = posts.slice(0, display <= posts.length ? display : posts.length);
    }
    /* Items output */
    const outputArray = [];
    posts.forEach((post, index) => {
        let itemOutput = '';
        if (l.type === 'cards') {
            const cardOutput = (0, cards_1.card)({
                args: {
                    headingLevel,
                    internalLink: post,
                    type: l.subtype,
                    index
                }
            });
            itemOutput = cardOutput.start + cardOutput.end;
        }
        if (l.type === 'listMinimal') {
            const itemArgs = { ...post };
            itemArgs.contentType = contentType;
            if (contentType === 'workCategory') {
                const length = data_1.archiveData.posts[contentType][post.id].length;
                itemArgs.text = `${length} work item${length === 1 ? '' : 's'}`;
            }
            itemOutput = (0, list_minimal_1.listMinimalItem)({
                args: itemArgs
            });
        }
        if (itemOutput !== '') {
            outputArray.push(itemOutput);
        }
    });
    /* Container output */
    let output = (outputArray.length > 0) ? outputArray.join('') : '';
    if (output !== '' && l.type === 'cards') {
        output = (0, cards_1.cards)({
            args: {
                content: output,
                type: l.subtype,
                length: posts.length
            }
        });
    }
    if (output !== '' && l.type === 'listMinimal') {
        output = (0, list_minimal_1.listMinimal)({
            args: {
                content: output
            }
        });
    }
    return output;
};
/* Exports */
exports.default = posts;
