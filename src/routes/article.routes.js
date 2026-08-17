const express = require('express');
const {postValidator, putValidator, commentValidator} = require('../validators/article.validator');
const validate = require('../middlewares/validate');
const {
    getArticles,
    getArticleById,
    postArticle,
    updateArticle,
    addComment,
    deleteArticle,
    removeArticleImage} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/articles', validate(postValidator), postArticle)

router.get('/articles', getArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', validate(putValidator), updateArticle)

router.post('/articles/:id/comments', validate(commentValidator), addComment);

router.delete('/articles/:id', deleteArticle)

router.delete('/articles/:id/image', removeArticleImage);

module.exports = router;