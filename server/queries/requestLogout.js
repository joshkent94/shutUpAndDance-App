const requestLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('shut-up-and-dance', { path: '/' }).redirect('/');
    });
};

module.exports = { requestLogout };