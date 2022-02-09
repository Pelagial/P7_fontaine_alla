/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const db_import = require("../config/db-config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** Signup ctrl */
/** Hash the password and send it with the email to DDB */
exports.signUp = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = ({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    const sql = `INSERT INTO users (username, email, password) VALUES ('${user.username}','${user.email}','${user.password}');`;
    db.query(sql, (err, result) => {
      if (!result) {
        res.status(400).json({ message: "Email déjà enregistré" });
        throw err;
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  }
  catch (err) {
    res.status(500).json({ message: "Failed registration" });
    throw err
  }
};


/** signIn ctrl */
exports.signIn = async (req, res) => {
  try {
    
  }
  catch (err) {
    res.status(500).json({ message: "Failed connection" });
    throw err
  }
};

/** logOut ctrl */
exports.logOut = async (req, res) => {
  try {
    
  }
  catch (err) {
    res.status(500).json({ message: "Failed to disconnect" });
    throw err
  }
};