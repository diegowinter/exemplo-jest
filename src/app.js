const express = require('express');
const app = express();
const router = express.Router();

// Aqui importamos as rotas da nossa API
const index = require('./routes/index');
const userRoute = require('./routes/user-route');

app.use('/', index);
app.use('/users', userRoute);

module.exports = app;