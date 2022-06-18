const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messagesController = require('../controllers/messages-controller');

const hasValidRequest = require('../../core/middlewares/error-request-handler');

// Middlewares
const idParamIsInteger            = require('../../users/middlewares/id-param-is-integer');
const hasValidAuthorization       = require('../../auth/middlewares/has-valid-authorization');
const findInCache                 = require('../../core/middlewares/cache-handler');
const { verifyPermissionsActionOnAllUsers } = require('../../users/middlewares/verify-users-permissions');
// const { verifyPermissionsActionOnOneMessage }  = require('../middlewares/verify-messages-permissions');

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Message]
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
router.get('/', hasValidAuthorization, verifyPermissionsActionOnAllUsers, findInCache, messagesController.getAll);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Message id
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
router.get('/:id', idParamIsInteger, hasValidAuthorization, findInCache, messagesController.getAllMessagesByChat);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a message
 *     tags: [Message]
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
 *             message:
 *               type: String
 *               description: message
 *               example: '¡Hello world!'
 *             id-user-sender:
 *               type: int
 *               description: user id
 *               example: 1
 *             id-user-receiver:
 *               type: int
 *               description: user id
 *               example: 2
 *             id-chat:
 *               type: int
 *               description: chat id
 *               example: 3
 *             status:
 *               type: String
 *               description: status
 *               example: 'TODO Read'
 *             url:
 *               type: String
 *               description: url de TODO
 *               example: 'TODO www.algo.com'
 *             is-image:
 *               type: boolean
 *               description: if the message is an image
 *               example: true
 *             is-video:
 *               type: boolean
 *               description: if the message is a video
 *               example: true
 *     responses:
 *       '201':
 *         description: Success response
 *       '400':
 *         description: Invalid body  
 *       '403':
 *         description: Forbidden access  
 */
router.post('/', hasValidAuthorization, [
    check('message', 'Mensaje es requerido').not().isEmpty().trim().escape(),
    check('id-user-sender', 'Usuario emisor es requerido').not().isEmpty().trim().escape(),
    check('id-user-receiver', 'Usuario receptor es requerido').not().isEmpty().trim().escape(),
    check('id-chat', 'Id de chat es requerido').not().isEmpty().trim().escape(),
    check('status', 'Estado es requerido').not().isEmpty().trim().escape(),
    check('url', 'Url es requerida').not().isEmpty().trim().escape(),
    check('is-image', 'isImage es requerida').not().isEmpty().trim().escape().isBoolean(),
    check('is-image', 'isImage debe ser un boolean').isInt(),
    check('is-video', 'isVideo es requerido').not().isEmpty().trim().escape().isBoolean(),
    check('is-video', 'isVideo debe ser un boolean').isInt(),
    // check('status').isIn(['canva', 'photoshop', 'gimp']),
    hasValidRequest
], messagesController.create);

// TODO: SWAGGER MODEL

module.exports = router;