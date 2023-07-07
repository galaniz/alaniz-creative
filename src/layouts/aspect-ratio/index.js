"use strict";
/**
 * Layouts - aspect ratio
 */
Object.defineProperty(exports, "__esModule", { value: true });
const aspectRatio = (props = { args: {} }) => {
    const { args = {} } = props;
    const { percent = 100 } = args;
    /* Output */
    return {
        start: `<div class="l-relative l-aspect-ratio-100 l-width-100-pc" style="--aspect-ratio-padding:${percent}%">`,
        end: '</div>'
    };
};
/* Exports */
exports.default = aspectRatio;
