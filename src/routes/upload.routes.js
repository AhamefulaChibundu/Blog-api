const express = require('express');
const upload = require('../middlewares/upload');
const { uploadImageController } = require('../controllers/upload.controller');

const router = express.Router();

router.post('/', upload.single('image'), uploadImageController);

module.exports = router;