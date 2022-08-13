const { RequestError } = require('../helpers');

const validation = schema => {
    const ver = async (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, error.message));
        }

        next();
    }
    return ver;
}

module.exports = validation;
