const express = require('express');
const app = express();
const cors = require('cors');
const logRequest = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const articleRoutes = require('./routes/article.routes');
const userRoutes = require('./routes/user.routes');
const upload = require('./middlewares/upload');

app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(logRequest);

app.use('/api/user/', userRoutes);
app.use('/api', articleRoutes);
app.post('/uploads', upload.single("image"), (req, res) =>{

    const fileName = req.file.filename;
    const fileUrl = req.file.path; // Cloudinary publicId
    
    console.log(fileName);
    console.log(fileUrl);
    console.log(req.file);
    
    res.status(201).json({
        message: 'Upload successful',
        image: {
            url: fileUrl,
            publicId: fileName
        }
    });
})

app.use(errorHandler);

module.exports = app;