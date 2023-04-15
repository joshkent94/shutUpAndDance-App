"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogin = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const requestLogin = (req, res) => {
    const cleanEmail = (0, sanitize_html_1.default)(req.body.email);
    const cleanPassword = (0, sanitize_html_1.default)(req.body.password);
    let hashedPassword;
    const session = req.session;
    connectionConfig_1.pool.query(`SELECT id, salt, password
                FROM users
                WHERE email = $1`, [cleanEmail]).then((data) => {
        if (data.rows.length === 0) {
            res.status(401).send({ message: 'Email address in incorrect' });
        }
        else {
            hashedPassword = data.rows[0].password;
            bcryptjs_1.default.compare(cleanPassword, hashedPassword, (err, match) => {
                if (err) {
                    throw err;
                }
                if (!match) {
                    res.status(401).send({ message: 'Password is incorrect' });
                }
                else {
                    connectionConfig_1.pool.query(`SELECT *
                            FROM users
                            INNER JOIN genres
                            ON (users.id = genres.user_id)
                            INNER JOIN widgets
                            ON (users.id = widgets.user_id)
                            WHERE users.id = ($1)`, [data.rows[0].id]).then((data) => {
                        session.userId = data.rows[0].id;
                        res.status(200).send({
                            id: data.rows[0].id,
                            firstName: data.rows[0].first_name,
                            lastName: data.rows[0].last_name,
                            email: data.rows[0].email,
                            genres: data.rows[0].genres,
                            widgets: data.rows[0].widgets,
                        });
                    });
                }
            });
        }
    });
};
exports.requestLogin = requestLogin;
