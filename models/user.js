const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema(
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
        avatarURL: {
            type: String,
            required: true,
        },
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },
    },
    { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    password: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    subscription: Joi.string()
        .default('starter')
        .valid('starter', 'pro', 'business')
        .trim(),
});

const loginSchema = Joi.object({
    password: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.any().valid('starter', 'pro', 'business'),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

const User = model('user', userSchema);

module.exports = {
    User,
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema,
}
