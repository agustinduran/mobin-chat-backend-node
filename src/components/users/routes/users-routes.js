const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Middlewares
const idParamIsInteger            = require('../middlewares/id-param-is-integer');
const hasValidAuthorization       = require('../../auth/middlewares/has-valid-authorization');
const findInCache                 = require('../../core/middlewares/cache-handler');
const { verifyPermissionsActionOnAllUsers, verifyPermissionsActionOnOneUser } = require('../middlewares/verify-users-permissions');

/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     consumes:
 *       application/json
 *     produces:
 *       application/json
 *     responses:
 *       '200':
 *         description: Success response
 *       '403':
 *         description: Forbidden access
 */
router.get('/', hasValidAuthorization, verifyPermissionsActionOnAllUsers, findInCache, usersController.getAll);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get an user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User id
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Success response
 *       '422':
 *         description: Id isn't an integer
 *       '403':
 *         description: Forbidden access
 *       '404':
 *         description: Resource not found
 */
router.get('/:id', idParamIsInteger, hasValidAuthorization, verifyPermissionsActionOnOneUser, findInCache, usersController.getById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Edit an user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User id
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Success response
 *       '422':
 *         description: Id isn't an integer
 *       '403':
 *         description: Forbidden access
 *       '404':
 *         description: Resource not found
 */
router.put('/:id', idParamIsInteger, hasValidAuthorization, verifyPermissionsActionOnOneUser, findInCache, usersController.editById);

module.exports = router;