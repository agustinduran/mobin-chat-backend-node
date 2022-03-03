const { config } = require('../../../config');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    var token = jwt.sign({ id: user.id, rol: user.rol }, config.keys.jwt);
    return token;
};

exports.validatePassword = (loginPassword, encriptedPassword) => {
    return bcrypt.compareSync(loginPassword, encriptedPassword);
};

exports.encriptPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    const encriptPasword = bcrypt.hashSync(password, salt);
    return encriptPasword;
};