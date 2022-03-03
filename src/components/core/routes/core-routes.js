const express = require('express');
const router = express.Router();

const coreController = require('../controllers/core-controller');

/**
 * @swagger
 * /api/:
 *   get:
 *     description: Used to corroborate the correct operation of the server
 *     tags: [Core]
 *     responses:
 *       '200':
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { 'success': true, 'message': '¡Hello World!' }
 */
router.get('/', coreController.helloWorld);

module.exports = router;