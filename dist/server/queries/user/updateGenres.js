"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGenres = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const updateGenres = (req, res) => {
    if (req.session.userId) {
        connectionConfig_1.pool.query(`SELECT user_id
                    FROM genres
                    WHERE user_id = $1`, [req.session.userId]).then((data) => {
            if (data.rows.length === 0) {
                connectionConfig_1.pool.query(`INSERT INTO genres
                                VALUES ($1, $2)`, [req.session.userId, req.body]).then(() => {
                    res.status(201).send();
                });
            }
            else {
                connectionConfig_1.pool.query(`UPDATE genres
                                SET genres = $1
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
exports.updateGenres = updateGenres;
