const hasValidRegister = (req, res, next) => {
    const {username, password, email, name, surname, phone } = req.body;
    if (!username || !password || !email || !name || !surname || !phone) {
        res.status(404).json({ success: false, message: "Todos los campos son obligatorios" });
    } else {
        return next();
    }
};

module.exports = hasValidRegister;