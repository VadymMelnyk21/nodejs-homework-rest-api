const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/contacts');
const { auth, validation } = require('../../middlewares');
const { joiSchema, favoriteSchema } = require('../../models/contacts');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.remove));

router.put('/:contactId', validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch('/:contactId/favorite', validation(favoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
