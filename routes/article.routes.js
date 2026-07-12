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

router.post('/articles', validate(postValidator), requireAuth, postArticle)

router.get('/articles', requireAuth, getArticles)

router.get('/articles/:id', requireAuth, getArticleById)

router.put('/articles/:id', validate(putValidator), requireAuth, updateArticle)

router.post('/articles/:id/comments', validate(commentValidator), requireAuth, addComment);

router.delete('/articles/:id', requireAuth, deleteArticle)

module.exports = router;