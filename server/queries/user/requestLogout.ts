const requestLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('shut-up-and-dance', { path: '/' });
        res.redirect('/');
    });
};

export { requestLogout };