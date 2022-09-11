const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const { HOST } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, 'Email in use')
    }

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = v4();
    const avatarURL = gravatar.url(email);

    const result = await User.create({
        email,
        password: hashPass,
        avatarURL,
        verificationToken,
    });

    const mail = {
        to: email,
        subject: 'Email confirmation',
        html: `<p>Welcome, </p><a target="_blank" href="${HOST}/api/users/verify/${verificationToken}">click to confirm</a>`,
    }

    await sendEmail(mail);

    res.status(201).json({
        status: 'created',
        code: 201,
        data: {
            user: result,
        },
    });
};

module.exports = register;
