const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Middlewares
const hasRoleAdmin          = require('../middlewares/has-role');
const idParamIsInteger      = require('../middlewares/id-param-is-integer');
const hasValidAuthorization = require('../../auth/middlewares/has-valid-authorization');

router.get('/', hasRoleAdmin, usersController.getAll);

/**
 * @swagger
 * /api/users/{id}):
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
 *               example: { 'success': true, 'token': '$3CR3T' }
 */
router.get('/:id', idParamIsInteger, hasValidAuthorization, usersController.getById);

module.exports = router;