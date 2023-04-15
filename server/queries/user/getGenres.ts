import { pool } from '../../connectionConfig'

const getGenres = (req, res) => {
    if (req.session.userId) {
        pool.query(
            `SELECT genres
                    FROM genres
                    WHERE user_id = $1`,
            [req.session.userId]
        ).then((data) => {
            if (data.rows.length === 0) {
                res.status(200).send()
            } else {
                res.status(200).send(data.rows[0].genres)
            }
        })
    } else {
        res.status(401).send()
    }
}

export { getGenres }
