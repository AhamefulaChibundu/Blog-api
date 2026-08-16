const express = require('express');
const app = express();
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const articleRoutes = require('./routes/article.routes');
const userRoutes = require('./routes/user.routes');
const uploadRoutes = require('./routes/upload.routes');

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(logRequest);

app.use('/api/user/', userRoutes);
app.use('/api', articleRoutes);
app.use('/uploads', uploadRoutes);

app.use(errorHandler);

module.exports = app;