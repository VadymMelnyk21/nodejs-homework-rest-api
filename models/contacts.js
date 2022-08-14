const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');
const crypto = require('crypto');


const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  }

  const newContacts = [...contacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }

  if (!body) {
    return null;
  }

  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
