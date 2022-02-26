const express = require('express');
const router = express.Router();

const users = require('../models/user');

router.post('/register', (req, res) => {
    // Validate body data
    if (req.body.username == null || req.body.email == null || req.body.password == null ||
        req.body.fullname == null || req.body.phone == null || req.body.address == null) {
        return res.status(422).json({ message: "Campos obligatorios requeridos" });
    }

    // TODO: Validar email, teléfono, etc

    // Validate user exists
    const userExists = users.find((element) => (element.username === req.body.username || element.email === req.body.email));
    if (userExists) {
        return res.status(409).json({ message: "Ese correo electrónico o username ya está siendo utilizado" });
    }

    const user = {
        // id      : arrayUtils.getNextId(users),
        username: req.body.username,
        email   : req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        phone   : req.body.phone,
        address : req.body.address,
        role    : "ROLE_USER"
    };

    users.push(user);
    return res.status(201).json({ user_id: user.id });
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find((element) => (element.username === username || element.email === username) && element.password === password);
    if (user) {
        return res.status(200).json({ user_id: user.id });
    } else {
        return res.status(401).json({ message: 'Usuario inválido' });
    }
});

module.exports = router;