const express = require('express');
const router = express.Router();

const coreController = require('../controllers/core-controller');

router.get('/', coreController.helloWorld);

module.exports = router;