/**
 * APP SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet'); // sécurisation injection
require('dotenv').config();

/** Routes import */
const userRoutes = require('./routes/user.routes');
const postsRoutes = require('./routes/post.routes');

/** DB import */
const { sequelize } = require('./models/index');

const app = express();

/**
 * Middlewares always executed ***********************************************************************************
 */
/** Morgan config */
app.use(morgan('tiny'));

/** Express-Parser config */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Cors config */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/** Helmet config */
app.use(helmet());

/** Images static folder */
app.use('./upload', express.static(path.join(__dirname, './upload')));

/** Routes use */
app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

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

/** EXPORT ***********************************************/
module.exports = app;

