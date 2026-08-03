const Joi = require('joi');

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
    registerUserValidator,
    userLoginValidator
};