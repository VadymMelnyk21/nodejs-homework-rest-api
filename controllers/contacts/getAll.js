const { Contact } = require('../../models/contacts')

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const contactsAll = await Contact.find({ owner },
        '',
        { skip, limit: Number(limit) })
        .populate('owner', '_id email');

    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contactsAll,
        },
    })
}

module.exports = getAll;
