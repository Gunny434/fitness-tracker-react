require("dotenv").config();
const express = require("express");
const app = express();
// Setup your Middleware and API Router here

const cors = require('cors');
const morgan = require('morgan');
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

const router = require('./api');
app.use('/api', router);

// const { client } = require('./db');

module.exports = app;
