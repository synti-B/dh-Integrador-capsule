function adminMiddLeware(req, res, next) {
    if (!req.session.userLogged || req.session.userLogged.category_id != 2) {
        return res.redirect('/');
    }
    next();
}
module.exports = adminMiddLeware;