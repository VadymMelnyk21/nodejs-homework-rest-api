const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passwordCompare) {
        throw RequestError(401, 'Email or password is wrong')
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30m' });

    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: 'succes',
        code: 200,
        data: {
            token,
        },
    });
};

module.exports = login;
