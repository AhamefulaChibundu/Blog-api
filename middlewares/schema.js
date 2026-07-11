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
        .required()
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
        .optional()
});

const commentValidator = Joi.object({
    author: Joi.string().required(),
    comment: Joi.string().min(2).required()
});


const registerUserValidator = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const userLoginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


module.exports = {
    postValidator,
    putValidator,
    commentValidator,
    registerUserValidator,
    userLoginValidator
};