const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/auth-controller');

const hasValidRequest = require('../../core/middlewares/error-request-handler');
const { usernameExists, emailExists, correctSamePasswords } = require('../../users/middlewares/email-username-exists');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     consumes:
 *       application/json
 *     produces:
 *       application/json
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         required: true
 *         schema:
 *           properties:
 *             username:
 *               type: string
 *               description: username or email
 *               example: agustineduran
 *             password:
 *               type: string
 *               description: password
 *               example: 123456
 *     responses:
 *       '201':
 *         description: Success response
 *       '400':
 *         description: Invalid body
 *       '401':
 *         description: Invalid credentials
 */
router.post('/login', [
    check('username', 'Usuario es requerido').not().isEmpty().trim().escape(),
    check('password', 'Contraseña es requerida').not().isEmpty().trim().escape(),
    hasValidRequest
], authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Create an user
 *     tags: [Auth]
 *     consumes:
 *       application/json
 *     produces:
 *       application/json
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: username
 *               example: agustineduran
 *             email:
 *               type: string
 *               description: email
 *               example: agustineduran@gmail.com
 *             password:
 *               type: string
 *               description: password
 *               example: 123456
 *             password-confirmation:
 *               type: string
 *               description: password-confirmation
 *               example: 123456
 *             name: 
 *               type: string
 *               description: name
 *               example: Agustín
 *             surname: 
 *               type: string
 *               description: surname
 *               example: Duran
 *             phone: 
 *               type: string
 *               description: phone
 *               example: 123456
 *     responses:
 *       '201':
 *         description: Success response
 *       '400':
 *         description: Invalid body    
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

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       name:
 *         type: string
 *       surname:
 *         type: string
 *       phone:
 *         type: string
 */
module.exports = router;