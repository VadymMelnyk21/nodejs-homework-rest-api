const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    phone: Joi.string().required(),
})

module.exports = contactSchema;
