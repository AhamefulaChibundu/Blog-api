const express = require('express');
const {postValidator, putValidator} = require('../middlewares/schema');
const validate = require('../middlewares/validator');
const {
    getArticles,
    getArticleById,
    postArticle,
    updateArticle,
    addComment,
    deleteArticle} = require('../controllers/article.controller')

const router = express.Router();

router.post('/articles', validate(postValidator), postArticle)

router.get('/articles', getArticles)

router.get('/articles/:id', getArticleById)

router.put('/articles/:id', validate(putValidator),updateArticle)

router.post('/articles/:id/comments', addComment);

router.delete('/articles/:id', deleteArticle)

module.exports = router;