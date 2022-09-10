const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        throw RequestError(404, 'User not found');
    }

    if (user.verify) {
        throw RequestError(400, 'Verification has already been passed');
    }

    const mail = {
        to: email,
        subject: 'Email confirmation',
        html: `<p>Welcome, </p><a target="_blank" href="http://localhost:5000/api/users/verify/${user.verificationToken}">click to confirm</a>`,
    }

    await sendEmail(mail);

    res.json({
        status: 'success',
        code: 200,
        message: 'Verification email sent',
    })
}

module.exports = resendVerifyEmail;
