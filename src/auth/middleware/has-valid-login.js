const hasValidLogin = (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(404).json({ success: false, message: "Todos los campos son obligatorios" });
    } else {
        return next();
    }
};

module.exports = hasValidLogin;