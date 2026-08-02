const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    content: {
        type: String,
        required: true,
        minLength: 20,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Technology",
            "Programming",
            "Business",
            "Education",
            "Health",
            "Lifestyle",
            "Sports",
            "Others"
        ]
    },
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: String,
                required: true,
                minLength: 2,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;