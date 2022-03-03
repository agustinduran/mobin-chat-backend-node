const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams-controller');

/**
 * @swagger
 * /api/teams/:
 *   get:
 *     description: Se utiliza para corroborar el funcionamiento del servidor
 *     responses:
 *       '200':
 *         description: Respuesta satisfactoria
 */
router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getById);

router.post('/', teamsController.save);

module.exports = router;