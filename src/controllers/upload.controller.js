const { uploadImage } = require('../utils/cloudinary');

const uploadImageController = async (req, res, next) => {
    try {
        const result = await uploadImage(req.file.buffer);

        return res.status(201).json({
            message: "Image uploaded successfully",
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadImageController
};