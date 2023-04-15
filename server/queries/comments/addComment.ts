import { pool } from '../../connectionConfig'
import sanitizeHtml from 'sanitize-html'

const addComment = (req, res) => {
    const threadId = req.params.threadId
    const cleanComment = sanitizeHtml(req.body.comment)
    pool.query(
        `INSERT INTO comments (thread_id, comment, user_id)
                VALUES ($1, $2, $3)`,
        [threadId, cleanComment, req.session.userId]
    ).then(() => {
        res.status(201).send()
    })
}

export { addComment }
