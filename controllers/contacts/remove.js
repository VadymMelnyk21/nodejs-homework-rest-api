const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const remove = async (req, res) => {
    const { contactId } = req.params;

    const contact = await contacts.removeContact(contactId);
    if (!contact) {
        throw RequestError(404, 'contact not found')
    }

    res.json({
        status: 'success',
        code: 200,
        message: `contact with id:${contactId} deleted`,
        data: {
            contact,
        }
    })
}

module.exports = remove;
