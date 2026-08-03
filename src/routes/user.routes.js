const express = require('express');
const validate = require('../middlewares/validate');
const {userLoginValidator, registerUserValidator} = require('../validators/user.validator');
const { registerUser, loginUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/auth/sign-up', validate(registerUserValidator), registerUser);

router.post('/auth/login', validate(userLoginValidator), loginUser);

module.exports = router;