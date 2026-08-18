const express = require('express');
const validate = require('../middlewares/validate');
const {userLoginValidator, registerUserValidator} = require('../validators/user.validator');
const { registerUser, loginUser, updateProfilePicture } = require('../controllers/user.controller');
const requireAuth = require('../middlewares/requireAuth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/auth/sign-up', validate(registerUserValidator), registerUser);

router.post('/auth/login', validate(userLoginValidator), loginUser);

router.put('/profile-picture', requireAuth, upload.single('image'), updateProfilePicture
);

module.exports = router;