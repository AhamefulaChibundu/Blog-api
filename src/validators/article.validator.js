const Joi = require('joi');

const postValidator = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
    
    category: Joi.string()
        .valid(
            "Technology",
            "Programming",
            "Business",
            "Education",
            "Health",
            "Lifestyle",
            "Sports",
            "Others"
        )
        .required(),

    image: Joi.object({
        url: Joi.string().uri().required(),
        publicId: Joi.string().required()
    }).optional() 
});

const putValidator = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(20).optional(),
    category: Joi.string()
        .valid(
            "Technology",
            "Programming",
            "Business",
            "Education",
            "Health",
            "Lifestyle",
            "Sports",
            "Others"
        )
        .optional(),
    
    image: Joi.object({
        url: Joi.string().uri().required(),
        publicId: Joi.string().required()
    }).optional()
});

const commentValidator = Joi.object({
    comment: Joi.string().min(2).required()
});

module.exports = {
    postValidator,
    putValidator,
    commentValidator
}