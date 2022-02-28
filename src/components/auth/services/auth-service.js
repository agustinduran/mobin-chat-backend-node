const authUtils = require('../utils/auth-utils');

exports.validateCredentials = async (repository, username, password) => {
    // const validCredentials = repository.getToken(username, password);
    // TODO: id obtengo de la consulta anterior
    var token = authUtils.generateToken({username: username, id: 2});    
    return token;
};