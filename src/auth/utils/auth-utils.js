const { config } = require('../../config');
var jwt = require('jsonwebtoken');

exports.generateToken = async (user) => {
    var token = jwt.sign({id: user.id, name: user.username}, config.keys.jwt);
    return token;
};