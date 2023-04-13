const { pool } = require('../../connectionConfig');

const likeCommentToggle = (req, res) => {
    const commentId = req.params.commentId;
    pool.query(`SELECT likes FROM comments
                WHERE id = ($1)`,
        [commentId])
        .then(data => {
            const likes = data.rows[0].likes;
            if (likes.includes(req.session.userId)) {
                const filteredArray = likes.filter(like => like !== req.session.userId);
                pool.query(`UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                    [filteredArray, commentId])
                    .then(data => {
                        res.status(200).send(data.rows[0].likes);
                    });
            } else {
                const newArray = [...likes, req.session.userId];
                pool.query(`UPDATE comments
                            SET likes = ($1)
                            WHERE id = ($2)
                            RETURNING likes`,
                    [newArray, commentId])
                    .then(data => {
                        res.status(200).send(data.rows[0].likes);
                    });
            };
        });
};

module.exports = { likeCommentToggle };