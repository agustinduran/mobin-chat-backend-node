const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

const hasValidRegister = require('../middleware/has-valid-register');
const hasValidLogin    = require('../middleware/has-valid-login');

router.post('/login', hasValidLogin, authController.login);
router.post('/register', hasValidRegister, authController.register);

module.exports = router;