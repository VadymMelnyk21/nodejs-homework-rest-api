const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    if (!result) {
        throw RequestError(404, 'Not found')
    }

    res.json({
        status: 'success',
        code: 200,
        message: 'subscription updated',
        data: { result },
    });
};

module.exports = updateSubscription;
