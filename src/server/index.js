const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('../config');
const userRoute = require('./users/user.route');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const { isAuth } = require('./helpers/middlewares');

app.use(express.static('dist'));

console.log('path',path.join(__dirname, '/uploads'));

app.use('/uploads', express.static(process.cwd() + '/uploads'));

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(fileUpload());

mongoose.connect(config.mongo.url);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

app.use('/api/user',userRoute);
app.use('/apis/user',isAuth,userRoute);
