"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentials = void 0;
const fs_1 = __importDefault(require("fs"));
// https credentials config
const privateKey = fs_1.default.readFileSync('/Users/josh.kent/key.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/Users/josh.kent/cert.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
};
exports.credentials = credentials;
