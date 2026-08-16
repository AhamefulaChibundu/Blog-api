const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res, next) => {
    try {
        cloudinary.uploader.upload_stream(
            {
                folder: 'uploads'
            },
            (error, result) => {
                if (error) {
                    return next(error);
                }

                return res.status(201).json({
                    message: 'Image uploaded successfully',
                    image: {
                        url: result.secure_url,
                        publicId: result.public_id
                    }
                });
            }
        ).end(req.file.buffer);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImage
};