const cloudinary = require('../config/cloudinary');

const uploadImage = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads',
                ...options
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
};

module.exports = {
    uploadImage,
    deleteImage
};