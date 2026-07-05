const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected Successfully')
    } catch (error) {
        console.error('Database connection Failed', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;