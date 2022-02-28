const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Middlewares
const hasRoleAdmin          = require('../middlewares/has-role');
const idParamIsInteger      = require('../middlewares/id-param-is-integer');
const hasValidAuthorization = require('../../auth/middlewares/has-valid-authorization');

router.get('/', hasRoleAdmin, usersController.getAll);
router.get('/:id', idParamIsInteger, hasValidAuthorization, usersController.getById);

module.exports = router;