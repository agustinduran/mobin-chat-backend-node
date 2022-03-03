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
 *       '201':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'token': '$3CR3T' }
 *       '400':
 *         description: Invalid body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {'success': false, 'errors': 'hola'}
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': false, 'message': 'Credenciales inválidas' }
 *     questBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username or email
 *                 example: agustineduran
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123456
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
 *       '201':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 *       '400':
 *         description: Invalid body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: {'success': false, 'errors': '[array]'}
 *     questBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: username
 *                 example: agustineduran
 *               email:
 *                 type: string
 *                 description: email
 *                 example: agustineduran@gmail.com
 *               password:
 *                 type: string
 *                 description: password
 *                 example: 123456
 *               password-confirmation:
 *                 type: string
 *                 description: password-confirmation
 *                 example: 123456
 *               name: 
 *                 type: string
 *                 description: name
 *                 example: Agustín
 *               surname: 
 *                 type: string
 *                 description: surname
 *                 example: Duran
 *               phone: 
 *                 type: string
 *                 description: phone
 *                 example: 123456
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