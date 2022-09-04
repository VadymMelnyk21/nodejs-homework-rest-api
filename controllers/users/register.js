const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, 'Email in use')
    }

    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const avatarURL = gravatar.url(email);
    const result = await User.create({ email, password: hashPass, avatarURL });
    res.status(201).json({
        status: 'created',
        code: 201,
        data: {
            user: result,
        },
    });
};

module.exports = register;