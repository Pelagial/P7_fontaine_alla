/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db_import = require("../config/db_config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** Signup ctrl 
* Hash the password and send it with the email to DDB
*/

exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      const sql = 'INSERT INTO users SET ?';
      query = db.query(sql, user, (err, result) => {
        if (err) res.status(400).json({ message: "Email déjà enregistré" });
        res.status(201).json({ message: "User created !" });
      });
    })
    .catch(error => res.status(500).json({ message: "Failed registration" }));
};