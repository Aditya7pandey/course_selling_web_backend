const express = require('express');
const userAuthController = require('../controllers/userAuth.controller')
const router = express.Router();

router.post('/register',userAuthController.register);

router.post('/login',userAuthController.login);

module.exports = router;