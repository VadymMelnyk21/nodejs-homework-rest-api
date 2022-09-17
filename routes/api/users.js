const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { auth, validation, upload } = require('../../middlewares');
const ctrl = require('../../controllers/users');
const {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(registerSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));

router.post('/verify', validation(verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/', auth, validation(subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
