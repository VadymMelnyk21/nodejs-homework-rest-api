const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { auth, validation } = require('../../middlewares');
const ctrl = require('../../controllers/users');
const { registerSchema, loginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(registerSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(loginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
