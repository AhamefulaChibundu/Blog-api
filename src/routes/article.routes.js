const express = require('express');
const {postValidator, putValidator, commentValidator, deleteImagesValidator} = require('../validators/article.validator');
const validate = require('../middlewares/validate');
const {
    getArticles,
    getArticleById,
    postArticle,
    updateArticle,
    addComment,
    deleteArticle,
    removeArticleImages} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');
const upload = require('../middlewares/upload');

const router = express.Router();

router.use(requireAuth);

router.post('/articles', upload.array('images', 10), validate(postValidator), postArticle)

router.get('/articles', getArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', upload.array('images', 10), validate(putValidator), updateArticle)

router.post('/articles/:id/comments', validate(commentValidator), addComment);

router.delete('/articles/:id/images', validate(deleteImagesValidator), removeArticleImages);

router.delete('/articles/:id', deleteArticle);

module.exports = router;