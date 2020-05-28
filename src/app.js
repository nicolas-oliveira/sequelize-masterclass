const express = require('express');
const routes = require('./routes');
const app = express();
app.use(express.json());
app.use(routes);

require('./database');

module.exports = app;