const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./database/connectDb');
const articleRoutes = require('./routes/article.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(logRequest);

connectDB();

app.use('/api', articleRoutes);
app.use('/api/user/', userRoutes)

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})