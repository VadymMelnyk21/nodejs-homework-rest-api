const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            required: [true, 'Set email for contact'],
        },
        phone: {
            type: String,
            required: [true, 'Set phone for contact'],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    phone: Joi.string().required(),
    favorite: Joi.bool(),
});

const favoriteSchema = Joi.object({
    favorite: Joi.bool().required(),
})

const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    joiSchema,
    favoriteSchema,
};
