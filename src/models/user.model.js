const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        minLength: 6,
        required: true,
    },

    image: {
        url: {
            type: String
        },
        publicId: {
            type: String
        }
    }
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;