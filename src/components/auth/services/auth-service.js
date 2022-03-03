const authUtils = require('../utils/auth-utils');

exports.encriptPassword = (password) => {
    return authUtils.encriptPassword(password);
};

exports.hasValidPassword = (loginPassword, encriptPasword) => {
    return authUtils.validatePassword(loginPassword, encriptPasword);
};

exports.generateToken = (user) => {
    var token = authUtils.generateToken(user);
    return token;
};