const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Middlewares
const idParamIsInteger            = require('../middlewares/id-param-is-integer');
const hasValidAuthorization       = require('../../auth/middlewares/has-valid-authorization');
const findInCache                 = require('../../core/middlewares/cache-handler');
const { verifyPermissionsGetAllUsers, verifyPermissionsGetOneUser } = require('../middlewares/verify-users-permissions');

/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'users': 'array' }
 */
router.get('/', hasValidAuthorization, verifyPermissionsGetAllUsers, findInCache, usersController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Get an user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'user': 'user' }
 */
router.get('/:id', idParamIsInteger, hasValidAuthorization, verifyPermissionsGetOneUser, findInCache, usersController.getById);

module.exports = router;