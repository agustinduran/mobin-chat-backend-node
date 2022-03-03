const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth-controller');

const hasValidRequest = require('../../core/middlewares/error-request-handler');
const { usernameExists, emailExists, correctSamePasswords } = require('../../users/middlewares/email-username-exists');

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Login
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'token': '$3CR3T' }
 */
router.post('/login', [
    check('username', 'Usuario es requerido').not().isEmpty().trim().escape(),
    check('password', 'Contraseña es requerida').not().isEmpty().trim().escape(),
    hasValidRequest
], authController.login);

/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Create an user
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'token': '$3CR3T' }
 */
router.post('/register', [
    check('username', 'Usuario es requerido').not().isEmpty().trim().escape(),
    check('username').custom(usernameExists),
    check('password', 'Contraseña es requerida').not().isEmpty().trim().escape(),
    check('password', 'Contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('password', 'Contraseña debe ser menor a 20 caracteres').isLength({ max: 20 }),
    check('password-confirmation', 'Repetir contraseña es requerido').not().isEmpty().trim().escape(),
    check('password-confirmation', 'Repetir contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('password-confirmation', 'Repetir contraseña debe ser menor a 20 caracteres').isLength({ max: 20 }),
    check('password-confirmation').custom(correctSamePasswords),
    check('email', 'Email es requerido').not().isEmpty().trim().escape(),
    check('email', 'Email ingresado inválido').isEmail(),
    check('email').custom(emailExists),
    check('name', 'Nombre es requerido').not().isEmpty().trim().escape(),
    check('surname', 'Apellido es requerido').not().isEmpty().trim().escape(),
    check('phone', 'Teléfono es requerido').not().isEmpty().trim().escape(),
    hasValidRequest
], authController.register);

module.exports = router;