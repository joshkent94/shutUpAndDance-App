"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const updateUserDetails = (req, res) => {
    const cleanFirstName = (0, sanitize_html_1.default)(req.body.firstName);
    const cleanLastName = (0, sanitize_html_1.default)(req.body.lastName);
    const cleanEmail = (0, sanitize_html_1.default)(req.body.email);
    const cleanPassword = (0, sanitize_html_1.default)(req.body.password);
    if (cleanPassword !== '') {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(cleanPassword, salt);
        connectionConfig_1.pool.query(`UPDATE users
                SET first_name = $1, last_name = $2, email = $3, salt = $4, password = $5
                WHERE id = $6`, [
            cleanFirstName,
            cleanLastName,
            cleanEmail,
            salt,
            hashedPassword,
            req.session.userId,
        ]).then(() => {
            res.status(200).send();
        });
    }
    else {
        connectionConfig_1.pool.query(`UPDATE users
                SET first_name = $1, last_name = $2, email = $3
                WHERE id = $4`, [cleanFirstName, cleanLastName, cleanEmail, req.session.userId]).then(() => {
            res.status(200).send();
        });
    }
};
exports.updateUserDetails = updateUserDetails;
