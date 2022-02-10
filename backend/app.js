/**
 * APP SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const mysql = require('mysql');
const helmet = require('helmet');

const app = express();
require('dotenv').config();


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
app.use(helmet());
app.use(express.json());

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
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profil.routes');
const publicationRoutes = require('./routes/publication.routes');

/** Use */
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/publication', publicationRoutes);

/** EXPORT ***********************************************/
module.exports = app;

