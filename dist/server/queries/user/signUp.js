"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const signUp = (req, res) => {
    const cleanFirstName = (0, sanitize_html_1.default)(req.body.firstName);
    const cleanLastName = (0, sanitize_html_1.default)(req.body.lastName);
    const cleanEmail = (0, sanitize_html_1.default)(req.body.email);
    const cleanPassword = (0, sanitize_html_1.default)(req.body.password);
    const session = req.session;
    connectionConfig_1.pool.query(`SELECT first_name
                FROM users
                WHERE email = $1`, [cleanEmail]).then((data) => {
        if (data.rows.length > 0) {
            res.status(404).send({ message: `Email address already in use` });
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hashedPassword = bcryptjs_1.default.hashSync(cleanPassword, salt);
            connectionConfig_1.pool.query(`INSERT INTO users (first_name, last_name, email, salt, password)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING id`, [
                cleanFirstName,
                cleanLastName,
                cleanEmail,
                salt,
                hashedPassword,
            ]).then((data) => {
                connectionConfig_1.pool.query(`INSERT INTO genres
                                    VALUES ($1, $2)
                                    RETURNING user_id`, [data.rows[0].id, []]).then((data) => {
                    connectionConfig_1.pool.query(`INSERT INTO widgets
                                            VALUES ($1, $2)
                                            RETURNING user_id`, [data.rows[0].user_id, []]).then((data) => {
                        session.userId = data.rows[0].user_id;
                        res.status(201).send({
                            message: `Account created successfully`,
                            id: data.rows[0].user_id,
                        });
                    });
                });
            });
        }
    });
};
exports.signUp = signUp;
