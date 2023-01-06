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

// app.use((error, req, res, next) => {
//     res.send({
//         error: "ERROR",
//         name: error.name,
//         message: error.message
//     })
// })

// 404 handler
app.get('*', (req, res) => {
    res.status(404).send({
        error: '404 - Not Found', 
        message: 'No route found for the requested URL'
    });
  });
  
  // error handling middleware
  app.use((error, req, res, next) => {
    console.error('SERVER ERROR: ', error);

    if(res.statusCode < 400) res.status(500);
    res.send({
        error: error.message, 
        name: error.name, 
        message: error.message, 
        table: error.table});
  });
  
module.exports = app;
