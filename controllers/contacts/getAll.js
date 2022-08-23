const { Contact } = require('../../models/contacts')

const getAll = async (_, res) => {
    const contactsAll = await Contact.find({});

    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contactsAll,
        },
    })
}

module.exports = getAll;
