"use strict";
/**
 * Render - info
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const info_1 = __importDefault(require("../svg/info"));
/**
 * Function - output info message
 *
 * @param {string} text
 * @return {string} HTML - div
 */
const info = (text = '') => {
    return `
    <div class="o-info-neutral l-padding-left-xs l-padding-right-xs l-padding-top-xs l-padding-bottom-xs b-radius-s">
      <div class="l-flex l-gap-margin-3xs">
        <div>
          ${(0, info_1.default)('l-width-s l-height-s l-width-m-m l-height-m-m')}
        </div>
        <div>
          <p class="t t-line-height-150-pc t-weight-medium l-margin-0">${text}</p>
        </div>
      </div>
    </div>
  `;
};
/* Exports */
exports.default = info;
