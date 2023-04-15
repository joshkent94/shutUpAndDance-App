"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWidgets = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const updateWidgets = (req, res) => {
    if (req.session.userId) {
        connectionConfig_1.pool.query(`SELECT user_id
                    FROM widgets
                    WHERE user_id = $1`, [req.session.userId]).then((data) => {
            if (data.rows.length === 0) {
                connectionConfig_1.pool.query(`INSERT INTO widgets
                                VALUES ($1, $2)`, [req.session.userId, req.body]).then(() => {
                    res.status(201).send();
                });
            }
            else {
                connectionConfig_1.pool.query(`UPDATE widgets
                                SET widgets = $1
                                WHERE user_id = $2`, [req.body, req.session.userId]).then(() => {
                    res.status(201).send();
                });
            }
        });
    }
    else {
        res.status(401).send();
    }
};
exports.updateWidgets = updateWidgets;
