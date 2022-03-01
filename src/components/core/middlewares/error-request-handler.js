const { validationResult } = require('express-validator');

const hasValidRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() == false) {
        return res.status(400).json({ success: false, errors: errors });
    }

    next();
};

module.exports = hasValidRequest;