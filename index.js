require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/connectDb');
const validateEnv = require("./src/config/env");

validateEnv();
const PORT = process.env.PORT;

const startServer = async() => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}

startServer();