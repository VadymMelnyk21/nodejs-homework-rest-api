const { Contact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const getById = async (req, res) => {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);
    if (!contact) {
        throw RequestError(404, 'contact not found')
    }

    res.json({
        status: 'success',
        code: 200,
        message: `contact id:${contactId}`,
        data: {
            contact,
        }
    })
}

module.exports = getById;
