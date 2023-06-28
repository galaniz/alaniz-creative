"use strict";
/**
 * Render - term content
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const utils_1 = require("../../utils");
const button_1 = __importDefault(require("../button"));
const container_1 = __importDefault(require("../container"));
const posts_1 = __importDefault(require("../posts"));
/**
 * Function - output main content for term
 *
 * @param {object} args
 * @param {string} args.contentType
 * @param {string} args.id
 * @return {string} HTML - html
 */
const termContent = (contentType = 'workCategory', id = '') => {
    /* Containing output */
    const containers = {
        section: (0, container_1.default)({
            args: {
                maxWidth: 's',
                tag: 'section',
                paddingBottom: 'xl',
                paddingBottomLarge: '2xl'
            }
        })
    };
    /* Archive links */
    let archiveLink = '';
    const termArchiveData = (0, utils_1.getArchiveLink)(contentType);
    if (termArchiveData.title !== '' && termArchiveData.link !== '') {
        archiveLink = (0, button_1.default)({
            args: {
                title: `All ${termArchiveData.title.toLowerCase()}`,
                iconBefore: 'arrow',
                type: 'secondary',
                justify: 'center',
                link: termArchiveData.link
            }
        });
    }
    /* Output */
    return `
    ${containers.section.start}
    ${(0, posts_1.default)({
        args: {
            contentType,
            id,
            display: -1,
            headingLevel: 2,
            layout: 'cardsCascading'
        }
    })}
    ${containers.section.end}
    ${archiveLink}
  `;
};
/* Exports */
exports.default = termContent;
