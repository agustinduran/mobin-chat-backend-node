const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Middlewares
const hasRoleAdmin          = require('../middlewares/has-role');
const idParamIsInteger      = require('../middlewares/id-param-is-integer');
const hasValidAuthorization = require('../../auth/middleware/has-valid-authorization');

router.get('/', hasRoleAdmin, usersController.getAll);

router.get('/:id', idParamIsInteger, hasValidAuthorization, usersController.getById);

router.post('/', usersController.save);

module.exports = router;