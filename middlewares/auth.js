const { User } = require('../models/user');
const { RequestError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ');

    try {
        if (bearer !== 'Bearer') {
            throw RequestError(401, 'Not authorized1')
        }

        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw RequestError(401, 'Not authorized2')
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === 'invalid signature') {
            error.status = 400;
        }
        next(error);
    }
};

module.exports = auth;
