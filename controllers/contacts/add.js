const { Contact } = require('../../models/contacts')

const add = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json({
        status: 'success',
        code: 200,
        message: 'contact added',
        data: {
            result,
        }
    })
}

module.exports = add;
