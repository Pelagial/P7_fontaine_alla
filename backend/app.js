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

/** DB import */
const { sequelize } = require('./models/index');

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
const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Mysql DB connected !');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();

/** IMAGES STATIC FOLDER ***********************************************/
app.use('/upload', express.static(path.join(__dirname, 'upload')));

/** ROUTES ***********************************************/
/** Import */
const usersRoutes = require('./routes/user.routes');
const publicationRoutes = require('./routes/post.routes');

/** Use */
app.use('/api/users', usersRoutes);
app.use('/api/publication', publicationRoutes);



/** EXPORT ***********************************************/
module.exports = app;

