const express = require('express');
const {postValidator, putValidator, commentValidator} = require('../middlewares/schema');
const validate = require('../middlewares/validator');
const {
    getArticles,
    getArticleById,
    postArticle,
    updateArticle,
    addComment,
    deleteArticle} = require('../controllers/article.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/articles', validate(postValidator), postArticle)

router.get('/articles', getArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', validate(putValidator), updateArticle)

router.post('/articles/:id/comments', validate(commentValidator), addComment);

router.delete('/articles/:id', deleteArticle)

module.exports = router;