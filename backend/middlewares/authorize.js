/**
 * AUTHORIZE MIDDLEWARE SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwt = require('jsonwebtoken');

const db_import = require("../config/db-config");
const db = db_import.DB();
require('dotenv').config();

/** EXPORT ***********************************************/
/** Compare that the actual token is the same as the decoded token */
module.exports = (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };  
    if (req.body.userId && req.body.userId !== userId) {
      res.cookie('jwt', '', { maxAge: 1 });
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(401).json({
      error: new Error('403: unauthorized request.')
    });
  }
};