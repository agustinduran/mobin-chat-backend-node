const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const chatsController = require('../controllers/chats-controller');

const hasValidRequest = require('../../core/middlewares/error-request-handler');

// Middlewares
const idParamIsInteger            = require('../../users/middlewares/id-param-is-integer');
const hasValidAuthorization       = require('../../auth/middlewares/has-valid-authorization');
const findInCache                 = require('../../core/middlewares/cache-handler');
const { verifyPermissionsActionOnAllUsers } = require('../../users/middlewares/verify-users-permissions');
const { verifyPermissionsActionOnOneChat }  = require('../middlewares/verify-chats-permissions');

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chat]
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
router.get('/', hasValidAuthorization, verifyPermissionsActionOnAllUsers, findInCache, chatsController.getAll);

/**
 * @swagger
 * /api/chats/{id}:
 *   get:
 *     summary: Get a chat
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chat id
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
router.get('/:id', idParamIsInteger, hasValidAuthorization, verifyPermissionsActionOnOneChat, findInCache, chatsController.getById);

/**
 * @swagger
 * /api/chats/user/{id}:
 *   get:
 *     summary: Get all chats by an user
 *     tags: [Chat]
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
router.get('/user/:id', idParamIsInteger, hasValidAuthorization, verifyPermissionsActionOnOneChat, findInCache, chatsController.getAllByIdUser);

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a chat
 *     tags: [Chat]
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
 *             id-user-transmitter:
 *               type: int
 *               description: user id
 *               example: 1
 *             id-user-receiver:
 *               type: int
 *               description: user id
 *               example: 2
 *     responses:
 *       '201':
 *         description: Success response
 *       '400':
 *         description: Invalid body
 *       '403':
 *         description: Forbidden access    
 */
router.post('/', hasValidAuthorization, verifyPermissionsActionOnOneChat, [
    check('id-user-transmitter', 'Usuario emisor es requerido').not().isEmpty().trim().escape(),
    check('id-user-receiver', 'Usuario receptor es requerido').not().isEmpty().trim().escape(),
    hasValidRequest
], chatsController.create);


/**
 * @swagger
 * definitions:
 *   Chat:
 *     properties:
 *       id:
 *         type: integer
 *       timestamp:
 *         type: timestamp
 *       id-user-sender:
 *         type: integer
 *       id-user-receiver:
 *         type: integer
 *       created-at:
 *         type: date
 *       updated-at:
 *         type: date
 */
module.exports = router;