"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenres = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const getGenres = (req, res) => {
    if (req.session.userId) {
        connectionConfig_1.pool.query(`SELECT genres
                    FROM genres
                    WHERE user_id = $1`, [req.session.userId]).then((data) => {
            if (data.rows.length === 0) {
                res.status(200).send();
            }
            else {
                res.status(200).send(data.rows[0].genres);
            }
        });
    }
    else {
        res.status(401).send();
    }
};
exports.getGenres = getGenres;
