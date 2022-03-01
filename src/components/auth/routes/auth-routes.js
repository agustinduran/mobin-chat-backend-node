const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth-controller');

const hasValidRequest       = require('../../core/middlewares/error-request-handler');
const { usernameOrEmailExists, usernameExists, emailExists } = require('../../users/middlewares/email-username-exists');

router.post('/login', [
    check('username', 'Username es requerido').not().isEmpty(),
    check('username').custom(usernameOrEmailExists),
    check('password', 'Contraseña es requerida').not().isEmpty(),
    check('password', 'Contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('password', 'Contraseña debe ser menor a 20 caracteres').isLength({ max: 20 }),
    hasValidRequest
], authController.login);

router.post('/register', [
    check('username', 'Usuario es requerido').not().isEmpty(),
    check('username').custom(usernameExists),
    check('password', 'Contraseña es requerida').not().isEmpty(),
    check('password', 'Contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('password', 'Contraseña debe ser menor a 20 caracteres').isLength({ max: 20 }),
    check('email', 'Email es requerido').not().isEmpty(),
    check('email', 'Email ingresado inválido').isEmail(),
    check('email').custom(emailExists),
    check('name', 'Nombre es requerido').not().isEmpty(),
    check('surname', 'Apellido es requerido').not().isEmpty(),
    check('phone', 'Teléfono es requerido').not().isEmpty(),
    hasValidRequest
], authController.register);

module.exports = router;