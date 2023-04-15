"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogout = void 0;
const requestLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('shut-up-and-dance', { path: '/' });
        res.redirect('/');
    });
};
exports.requestLogout = requestLogout;
