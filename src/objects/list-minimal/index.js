"use strict";
/**
 * Render - list minimal
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMinimal = exports.listMinimalItem = void 0;
/* Imports */
const container_1 = __importDefault(require("../container"));
const rich_text_1 = __importDefault(require("../rich-text"));
const listMinimalItem = (props = { args: {} }) => {
    const { args = {} } = props;
    const { id = '', title = '', slug = '', contentType = '', text = '' } = args;
    /* Title, slug and content type required */
    if (id === '' || title === '' || slug === '' || contentType === '') {
        return '';
    }
    /* Parents */
    const parents = [
        {
            renderType: 'card',
            internalLink: {
                id,
                contentType,
                slug
            }
        }
    ];
    /* Content */
    let content = (0, rich_text_1.default)({
        args: {
            tag: 'h2',
            content: title,
            classes: 'l-inline-block l-relative'
        },
        parents
    });
    if (text !== '') {
        content += (0, rich_text_1.default)({
            args: {
                tag: 'p',
                content: text,
                textStyle: 's',
                classes: 'l-padding-top-2xs'
            }
        });
    }
    /* Output */
    const containerArgs = {
        args: {
            tag: 'li'
        }
    };
    const itemContainer = (0, container_1.default)(containerArgs);
    return (itemContainer.start +
        content +
        itemContainer.end);
};
exports.listMinimalItem = listMinimalItem;
const listMinimal = (props = { args: {} }) => {
    const { args = {} } = props;
    const { content = '' } = args;
    /* Content required */
    if (content === '') {
        return '';
    }
    /* Output */
    const containerArgs = {
        args: {
            tag: 'ul',
            gap: 'm',
            gapLarge: 'l',
            classes: 'e-underline'
        }
    };
    const listContainer = (0, container_1.default)(containerArgs);
    return (listContainer.start +
        content +
        listContainer.end);
};
exports.listMinimal = listMinimal;
