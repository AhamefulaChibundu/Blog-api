const articleModel = require('../models/article.model.js');
const {uploadImage, deleteImage} = require('../utils/cloudinary');

const postArticle = async (req, res, next) => {
    const uploadedImages = [];

    try {
        // Upload each image file to Cloudinary
        if (req.files?.length) {
            for (const file of req.files) {
                const result = await uploadImage(file.buffer);

                uploadedImages.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        }

        const newArticle = new articleModel({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.user._id,
            images: uploadedImages
        });

        await newArticle.save();

        const populatedArticle = await articleModel
            .findById(newArticle._id)
            .populate("author", "_id name email");

        return res.status(201).json({
            message: "Article created Successfully",
            data: populatedArticle
        });

    } catch (error) {
        // If something fails after images were uploaded,
        // remove those images from Cloudinary.
        for (const image of uploadedImages) {
            try {
                await deleteImage(image.publicId);
            } catch (cleanupError) {
                console.error(
                    `Failed to clean up image ${image.publicId}`,
                    cleanupError
                );
            }
        }

        console.error(error);
        next(error);
    }
};

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
            .populate("comments.author", "_id name email")
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
        const article = await articleModel.findById(req.params.id)
        .populate("author", "_id name email")
        .populate("comments.author", "_id name email");
        
        if (!article) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`
            });
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
    const uploadedImages = [];

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

        // Upload any new images to Cloudinary
        if (req.files?.length) {
            for (const file of req.files) {
                const result = await uploadImage(file.buffer);

                uploadedImages.push({
                    url: result.secure_url,
                    publicId: result.public_id
                });
            }
        }

        // Update normal article fields
        if (req.body.title !== undefined) {
            article.title = req.body.title;
        }

        if (req.body.content !== undefined) {
            article.content = req.body.content;
        }

        if (req.body.category !== undefined) {
            article.category = req.body.category;
        }

        // Add new images to existing images
        if (uploadedImages.length) {
            article.images.push(...uploadedImages);
        }

        await article.save();

        const populatedArticle = await articleModel
            .findById(article._id)
            .populate("author", "_id name email")
            .populate("comments.author", "_id name email");

        return res.status(200).json({
            message: "Article Updated Successfully",
            data: populatedArticle
        });

    } catch (error) {
        // Clean up any Cloudinary images uploaded before the update failed
        for (const image of uploadedImages) {
            try {
                await deleteImage(image.publicId);
            } catch (cleanupError) {
                console.error(
                    `Failed to clean up image ${image.publicId}`,
                    cleanupError
                );
            }
        }

        console.error(error);
        next(error);
    }
};

const removeArticleImages = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to modify this article"
            });
        }

        const { publicIds } = req.body;

        // Find images that actually belong to this article
        const imagesToDelete = article.images.filter(image =>
            publicIds.includes(image.publicId)
        );

        if (imagesToDelete.length === 0) {
            return res.status(404).json({
                message: "None of the provided images were found in this article"
            });
        }

        const deletedPublicIds = [];
        const failedPublicIds = [];

        // Try every image independently
        for (const image of imagesToDelete) {
            try {
                const result = await deleteImage(image.publicId);

                if (result.result === "not found") {
                    // The image is already gone from Cloudinary.
                    // Treat it as successfully deleted.
                    deletedPublicIds.push(image.publicId);
                } else {
                    deletedPublicIds.push(image.publicId);
                }

            } catch (imageError) {
                console.error(
                    `Failed to delete image ${image.publicId} from Cloudinary`,
                    imageError
                );

                failedPublicIds.push(image.publicId);
            }
        }

        // Remove only images that were successfully deleted
        // from Cloudinary.
        if (deletedPublicIds.length > 0) {
            article.images = article.images.filter(
                image => !deletedPublicIds.includes(image.publicId)
            );

            await article.save();
        }

        // If some images failed, tell the client exactly which ones
        if (failedPublicIds.length > 0) {
            return res.status(207).json({
                message: "Some images were deleted, but some failed",
                deleted: deletedPublicIds,
                failed: failedPublicIds,
                data: article
            });
        }

        return res.status(200).json({
            message: "Article images deleted successfully",
            deleted: deletedPublicIds,
            data: article
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

const addComment = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }

        article.comments.push({
            author: req.user._id,
            comment: req.body.comment
        });

        await article.save();

        const populatedArticle = await articleModel
        .findById(article._id)
        .populate("author", "_id name email")
        .populate("comments.author", "_id name email");
        
        return res.status(201).json({
            message: "Comment added successfully",
            data: populatedArticle
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

        // Save the image public IDs before deleting anything
        const publicIds = article.images.map(image => image.publicId);

        const deletedPublicIds = [];
        const failedPublicIds = [];

        // Try to delete every image from Cloudinary
        for (const publicId of publicIds) {
            try {
                await deleteImage(publicId);

                deletedPublicIds.push(publicId);

            } catch (imageError) {
                console.error(
                    `Failed to delete image ${publicId} from Cloudinary`,
                    imageError
                );

                failedPublicIds.push(publicId);
            }
        }

        // If any image could not be deleted from Cloudinary,
        // keep the article in MongoDB so the deletion can be retried.
        if (failedPublicIds.length > 0) {
            return res.status(500).json({
                message: "Article was not deleted because some images could not be removed",
                deletedImages: deletedPublicIds,
                failedImages: failedPublicIds
            });
        }

        // All Cloudinary images were successfully deleted.
        // Now delete the article from MongoDB.
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
    deleteArticle,
    removeArticleImages,
}