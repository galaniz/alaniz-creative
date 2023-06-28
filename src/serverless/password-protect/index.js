"use strict";
/**
 * Serverless - password protect
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const utils_1 = require("../utils");
const http_error_1 = __importDefault(require("../../render/http-error"));
const protect_1 = __importDefault(require("../../render/protect"));
/**
 * Function - check password set before showing page
 *
 * @private
 * @param {object} context
 * @param {object} context.request
 * @param {object} context.env
 * @param {function} context.next
 * @return {object} Response
 */
const passwordProtect = async ({ request, env, next }) => {
    try {
        /* Check cookie */
        const cookieName = 'acp_set';
        const cookie = request.headers.get('cookie');
        /* Show page if cookie set otherwise password page */
        if (cookie && cookie.includes(`${cookieName}=true`)) {
            return next();
        }
        else {
            const html = await (0, protect_1.default)();
            return new Response(html, {
                status: 200,
                headers: {
                    'content-type': 'text/html;charset=UTF-8'
                }
            });
        }
    }
    catch (error) {
        console.error('Error with password protect function: ', error);
        (0, utils_1.setDataVars)(env);
        return new Response((0, http_error_1.default)('500'), {
            status: error.httpStatusCode || 500
        });
    }
};
/* Export */
exports.default = passwordProtect;
