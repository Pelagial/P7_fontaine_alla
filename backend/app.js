/**
 * APP SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const path = require('path');
const fileUpload =  require('express-fileupload');

const helmet = require('helmet');
require('dotenv').config();

const app = express();



/**
 * Prevent Cors issues ***********************************************************************************
 */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * Middlewares always executed ***********************************************************************************
 */
/** Morgan config */
app.use(morgan('tiny'));

/** FileUpload config */
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

/** Express-Parser config */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Helmet config */
app.use(helmet());

/** DB CONNECT ***********************************************/
const db_import = require("./config/db-config");
const db = db_import.DB();

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql DB connected !');
});


/** ROUTES ***********************************************/
/** Import */
const usersRoutes = require('./routes/user.routes');
const publicationRoutes = require('./routes/publication.routes');

/** Use */
app.use('/api/users', usersRoutes);
app.use('/api/publication', publicationRoutes);



/** EXPORT ***********************************************/
module.exports = app;

