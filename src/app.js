const express = require('express');

const cors = require('cors');
require('dotenv').config();

const {middlewareGlobal} = require('./middlewares/middleware')

const helmet = require('helmet'); 

const createConnection = require('./middlewares/create-connection');

const serverError = require('./middlewares/server-error');

const app = express();

const routes = require('./routes/index');

app.use(middlewareGlobal);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(createConnection);
app.use('/', routes);
app.use(serverError);

module.exports.app = app;
