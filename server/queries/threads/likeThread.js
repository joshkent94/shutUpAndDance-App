const { pool } = require('../../connectionConfig');

const likeThreadToggle = (req, res) => {
    const threadId = req.params.threadId;
    pool.query(`SELECT likes FROM threads
                WHERE id = ($1)`,
        [threadId])
        .then(data => {
            const likes = data.rows[0].likes;
            if (likes.includes(req.session.userId)) {
                const filteredArray = likes.filter(like => like !== req.session.userId);
                pool.query(`UPDATE threads
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                    [filteredArray, threadId])
                    .then(data => {
                        res.status(200).send(data.rows[0].likes);
                    });
            } else {
                const newArray = [...likes, req.session.userId];
                pool.query(`UPDATE threads
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                    [newArray, threadId])
                    .then(data => {
                        res.status(200).send(data.rows[0].likes);
                    });
            };
        });
};

module.exports = { likeThreadToggle };