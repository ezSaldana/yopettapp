const express = require('express');
const app = express();

app.use('/auth', require('./auth'));
app.use('/dog', require('./dog'));
app.use('/info', require('./info'));

module.exports = app;
