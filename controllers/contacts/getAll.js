const contacts = require('../../models/contacts');

const getAll = async (_, res) => {
    const contactsAll = await contacts.listContacts();

    res.json({
        status: 'success',
        code: 200,
        data: {
            result: contactsAll,
        },
    })
}

module.exports = getAll;
