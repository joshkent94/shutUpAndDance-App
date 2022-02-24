"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
require("./Footer.css");
function Footer() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ id: "footer" }, { children: (0, jsx_runtime_1.jsxs)("p", __assign({ id: "footer-message" }, { children: ["Made with ", (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faHeart }, void 0), " by Shut Up And Dance Ltd. ", (0, jsx_runtime_1.jsx)(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faCopyright }, void 0), " All rights reserved."] }), void 0) }), void 0));
}
exports["default"] = Footer;
;
