const { pool } = require('../../connectionConfig');

const updateWidgets = (req, res) => {
    if (req.session.userId) {
        pool.query(`SELECT user_id
                    FROM widgets
                    WHERE user_id = $1`,
            [req.session.userId])
            .then(data => {
                if (data.rows.length === 0) {
                    pool.query(`INSERT INTO widgets
                                VALUES ($1, $2)`,
                        [req.session.userId, req.body])
                        .then(data => {
                            res.status(201).send();
                        });
                } else {
                    pool.query(`UPDATE widgets
                                SET widgets = $1
                                WHERE user_id = $2`,
                        [req.body, req.session.userId])
                        .then(data => {
                            res.status(201).send();
                        });
                };
            });
    } else {
        res.status(401).send();
    };
};

module.exports = { updateWidgets };