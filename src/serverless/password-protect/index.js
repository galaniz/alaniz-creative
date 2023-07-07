"use strict";
/**
 * Serverless - password protect
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const http_error_1 = __importDefault(require("../../components/http-error"));
const protect_1 = __importDefault(require("../../components/protect"));
const passwordProtect = async ({ request, next }) => {
    try {
        /* Check cookie */
        const cookieName = 'acp_set';
        const cookie = request.headers.get('cookie');
        const cookieExists = cookie !== null ? cookie.includes(`${cookieName}=true`) : false;
        /* Show page if cookie set otherwise password page */
        if (cookieExists) {
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
        const statusCode = typeof error.httpStatusCode === 'number' ? error.httpStatusCode : 500;
        return new Response(await (0, http_error_1.default)(500), {
            status: statusCode
        });
    }
};
/* Export */
exports.default = passwordProtect;
