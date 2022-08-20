const { Contact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const contact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true, });
    if (!contact) {
        throw RequestError(404, 'contact not found')
    }

    res.json({
        status: 'success',
        code: 200,
        message: `contact with favorite id:${contactId} updated`,
        data: {
            contact,
        }
    })
}

module.exports = updateStatusContact;