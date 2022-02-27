const authUtils = require('../utils/auth-utils');

exports.validateCredentials = async (repository, username, password) => {
    // const validCredentials = repository.getToken(username, password);
    // TODO: id obtengo de la consulta anterior
    var token = authUtils.generateToken({username: username, id: 2});    
    return token;
};

exports.register = async (repository, user) => {
    // TODO: Middleware Validate body data
    if (user.username == null || user.email == null || user.password == null ||
        user.fullname == null || user.phone == null || user.address == null) {
        // return res.status(422).json({ message: "Campos obligatorios requeridos" });
    }

    // TODO: Validar email, teléfono, etc

    // TODO: Validate user exists
    // const userExists = users.find((element) => (element.username === req.body.username || element.email === req.body.email));
    // if (userExists) {
    //     return res.status(409).json({ message: "Ese correo electrónico o username ya está siendo utilizado" });
    // }

    // const user = {
    //     // id      : arrayUtils.getNextId(users),
    //     username: req.body.username,
    //     email   : req.body.email,
    //     password: req.body.password,
    //     fullname: req.body.fullname,
    //     phone   : req.body.phone,
    //     address : req.body.address,
    //     role    : "ROLE_USER"
    // };

    // repository.save(user);
    // return res.status(201).json({ user_id: user.id });
};