const articleModel = require('../models/article.model.js');
const Joi = require('joi');

const postArticle = async (req, res, next) => {
    
    try {
        const newArticle = new articleModel({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.user._id
        })
        await newArticle.save();
        return res.status(201).json({
            message: "Article created Successfully",
            data: newArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getArticles = async (req, res, next) => {

    const { search, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.category) {
        query.category = req.query.category;
    }

    if (search) {
        query = {
            $or: [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    content: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        };
    }

    try {
        const articles = await articleModel
            .find(query).populate("author", "_id name email")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        const totalArticles = await articleModel.countDocuments(query);

        return res.status(200).json({
            message: "Articles fetched successfully",
            data: articles,
            currentPage: Number(page),
            totalPages: Math.ceil(totalArticles / limit),
            totalArticles
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id).populate("author", "_id name email");
        if (!article) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id}`
            })
        }
        return res.status(200).json({
            message: "Article fetched",
            data: article
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const updateArticle = async (req, res, next) => {
    
    try {

        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to update this article"
            });
        }
        const updatedArticle = await articleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        return res.status(200).json({
            message: "Article Updated Successfully",
            data: updatedArticle
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const addComment = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        article.comments.push(req.body);

        await article.save();

        return res.status(201).json({
            message: "Comment added successfully",
            data: article
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this article"
            });
        }

        await article.deleteOne();

        return res.status(204).send();

    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    postArticle,
    getArticles, 
    getArticleById,
    updateArticle,
    addComment,
    deleteArticle
}