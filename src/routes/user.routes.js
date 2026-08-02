const express = require('express');
const validate = require('../middlewares/validator');
const {userLoginValidator, registerUserValidator} = require('../middlewares/schema');
const { registerUser, loginUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/auth/sign-up', validate(registerUserValidator), registerUser);

router.post('/auth/login', validate(userLoginValidator), loginUser);

module.exports = router;