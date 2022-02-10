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
module.exports.signUp = async (req, res) => {
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
module.exports.signIn = async (req, res) => {
  try{
// Check if user exists in DB 
    const { email, password } = req.body;
    const sql = `SELECT idusers, username, password FROM users WHERE email='${email}'`;
    db.query(sql, (err, result) => {
        if (err) {
          return res.status(404).json({ err });
        }
// Control if the password is correct
        const { idusers: idusers, password: hashedPassword } = result[0];
        bcrypt.compare(password, hashedPassword)
        .then(valid => {
// Then if the password isn't correct return a error
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
// Then if the password is correct creat a token
          res.cookie ('jwt', jwt.sign({ userId: idusers },process.env.JWT_SECRET_TOKEN,{ expiresIn: '24h' }));
          res.status(200).json({userId: idusers});
        })
        .catch(error => res.status(500).json({ error }));
    });
  }
  catch (err) {
    res.status(500).json({ message: "Failed to connect" });
    throw err
  }
};

/** logOut ctrl */
module.exports.logOut = async (req, res) => {
  try {
    res.cookie('jwt', '',{ maxAge: 1 });
    res.redirect('/');
  }
  catch (err) {
    res.status(500).json({ message: "Failed to disconnect" });
    throw err
  }
};