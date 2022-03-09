/**
 * AUTHORIZE MIDDLEWARE SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwt = require('jsonwebtoken');
const jwtUtils = require('../utils/jwt.utils');
require('dotenv').config();

/** EXPORT ***********************************************/
/** Compare that the actual token is the same as the decoded token */
module.exports = (req, res, next) => {
  try {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const token = module.exports.parseAuthorization(authorization);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);

    req.auth = { userId };  
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('403: unauthorized request.')
    });
  }
};
