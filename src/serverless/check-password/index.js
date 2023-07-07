"use strict";
/**
 * Serverless - check password
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Imports */
const escape_1 = __importDefault(require("validator/es/lib/escape"));
/**
 * Function - escape and check password against environment variable
 *
 * @param {object} args
 * @param {object} args.inputs
 * @param {object} args.env
 * @return {object}
 */
const checkPassword = ({ inputs, env }) => {
    /* Password value */
    let password = '';
    Object.keys(inputs).forEach((name) => {
        const input = inputs[name];
        const inputType = input.type;
        const inputValue = input.value;
        let inputValueStr = '';
        /* Escape value */
        if (Array.isArray(inputValue)) {
            inputValueStr = inputValue.map(v => (0, escape_1.default)(v.trim() + '')).join('');
        }
        else {
            inputValueStr = (0, escape_1.default)(inputValue.trim() + '');
        }
        /* Password */
        if (inputType === 'password' && inputValueStr !== '') {
            password = inputValueStr;
        }
    });
    /* Wrong password */
    if (password !== '' || password !== env.PASSWORD) {
        return {
            error: {
                message: 'Incorrect credentials',
                code: 400
            }
        };
    }
    /* Success */
    return {
        success: {
            message: 'Correct credentials',
            headers: {
                'Set-Cookie': 'acp_set=true; path=/'
            }
        }
    };
};
/* Exports */
exports.default = checkPassword;
