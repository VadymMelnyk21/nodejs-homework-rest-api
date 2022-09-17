const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = { ...data, from: EMAIL_FROM };
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = sendEmail;
