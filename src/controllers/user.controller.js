const userModel = require('../models/user.model');
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");
const { uploadImage, deleteImage } = require("../utils/cloudinary");

const registerUser = async(req, res, next) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({email: email});

        if(existingUser){
            return res.status(400).json({message: "User Already Exist"})
        }
        const hashed = await hashPassword(password);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashed
        })

        await newUser.save();

        return res.status(201).json({
            message: "User created Successfully"
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email})

        if(!user) {
            return res.status(404).json("User does not exist")
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid Credentials"
            });
}
        const token = generateToken(user);

        const resUser = {
            _id : user._id,
            email: user.email,
            name: user.name
        }

        return res.status(200).json({
            message: "Logged in",
            user: resUser,
            token
        })
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const updateProfilePicture = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please provide an image"
            });
        }

        const oldPublicId = user.image?.publicId;

        // Upload the new image to Cloudinary
        const newImage = await uploadImage(req.file.buffer);

        try {
            // Update MongoDB with the new image
            user.image = {
                url: newImage.secure_url,
                publicId: newImage.public_id
            };

            await user.save();

        } catch (databaseError) {

            // MongoDB failed, so delete the new Cloudinary image
            await deleteImage(newImage.public_id);

            throw databaseError;
        }

        // Delete the old image after MongoDB is updated
        if (oldPublicId) {
            const deleteResult = await deleteImage(oldPublicId);

            if (deleteResult.result === "not found") {
                console.warn(
                    `Old profile image ${oldPublicId} was not found on Cloudinary`
                );
            }
        }

        return res.status(200).json({
            message: "Profile picture updated successfully",
            image: user.image
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateProfilePicture
}