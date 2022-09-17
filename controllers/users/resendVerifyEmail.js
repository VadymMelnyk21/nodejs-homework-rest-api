const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');

const { HOST } = process.env;

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(404, 'User not found');
    }

    if (user.verify) {
        throw RequestError(400, 'Verification has already been passed');
    }

    const mail = {
        to: email,
        subject: 'Email confirmation',
        html: `<p>Welcome, </p><a target="_blank" href="${HOST}/api/users/verify/${user.verificationToken}">click to confirm</a>`,
    }

    await sendEmail(mail);

    res.json({
        status: 'success',
        code: 200,
        message: 'Verification email sent',
    })
}

module.exports = resendVerifyEmail;
