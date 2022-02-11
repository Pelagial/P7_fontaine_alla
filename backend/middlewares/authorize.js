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
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      const { user_id: userId } = decodedToken;
      let db = dbc.getDB();
      const sql = `SELECT idusers FROM users WHERE idusers = ${userId}`;
      db.query(sql, (err, result) => {
        if (err) res.status(204).json(err);
        else {
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Unauthorized"});
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};