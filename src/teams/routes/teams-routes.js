const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams-controller');

router.get('/', teamsController.getAll);

router.get('/:id', teamsController.getById);

module.exports = router;