"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThread = void 0;
const connectionConfig_1 = require("../../connectionConfig");
const getThread = (req, res) => {
    const threadId = req.params.threadId;
    const regex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if (regex.test(threadId)) {
        connectionConfig_1.pool.query(`SELECT threads.title, threads.date_time, threads.initial_comment, threads.likes, users.first_name, users.last_name
                FROM threads INNER JOIN users ON (threads.creator_user_id = users.id)
                WHERE threads.id = ($1)`, [threadId]).then((data) => {
            if (data.rows[0]) {
                res.status(200).send(data.rows[0]);
            }
            else {
                res.status(404).send();
            }
        });
    }
    else {
        res.status(404).send();
    }
};
exports.getThread = getThread;
