const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');

const avatarDirname = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;

    try {
        const [extension] = originalname.split('.').reverse();
        const imageName = `${id}.${extension}`;

        const resultUpload = path.join(avatarDirname, imageName);
        await fs.rename(tempUpload, resultUpload);

        const avatar = await jimp.read(resultUpload);
        await avatar.resize(250, 250).write(resultUpload);

        const avatarURL = path.join('avatars', resultUpload);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({ avatarURL });

    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;
