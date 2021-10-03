const { pool } = require("../connectionConfig");

const updateUserDetails = (req, res) => {
    pool.query(`UPDATE users
                SET first_name = $1, last_name = $2, email = $3
                WHERE id = $4`,
        [req.body.firstName, req.body.lastName, req.body.email, req.session.userId])
        .then(() => {
            res.status(200).send();
        });
};

module.exports = {updateUserDetails};