const express = require('express');

const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/contacts');
const { validation } = require('../../middlewares');
const schemas = require('../../schemas/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(schemas), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.remove));

router.put('/:contactId', validation(schemas), ctrlWrapper(ctrl.updateById));

module.exports = router;
