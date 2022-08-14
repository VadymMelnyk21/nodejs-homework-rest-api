const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const updateById = async (req, res) => {
    const { contactId } = req.params;

    const contact = await contacts.updateContact(contactId, req.body);
    if (!contact) {
        throw RequestError(404, 'contact not found')
    }

    res.json({
        status: 'success',
        code: 200,
        message: `contact with id:${contactId} updated`,
        data: {
            contact,
        }
    })
}

module.exports = updateById;
