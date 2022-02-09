/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const db_import = require("../config/db-config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** getAllUserProfile ctrl */
module.exports.getAllUserProfile = async (req, res) => {
  try {
    const sql = 'SELECT `create_time`, `email`, `followers`, `following`, `idusers`, `likes`, `pictures`, `username` FROM users';
    db.query(sql, (err, result) => {
      if (!result) {
        res.status(404).json({ err });
      } else {
        res.status(200).json(result);
      }
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};

/** selectOneUserProfile ctrl */
module.exports.selectOneUserProfile = async (req, res) => {
  try {
    const { id: idusers } = req.params;
    const sql = `SELECT * FROM users WHERE idusers = ${idusers}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      delete result[0].password;
      res.status(200).json(result);
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};

/** updateUserProfile ctrl */
module.exports.updateUserProfile = async (req, res) => {
  try {
    const { id: idusers } = req.params;
    const { username, email} = req.body;
    const sql = `UPDATE users SET username = '${username}', email = '${email}' WHERE idusers = ${idusers}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(201).json({ message: "User updated !" });
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};

/** deleteUserProfile ctrl */
module.exports.deleteUserProfile = async (req, res) => {
  try {
    const { id: idusers } = req.params;
    const sql = `DELETE FROM users WHERE idusers = ${idusers}`;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(404).json({ err });
      }
      res.status(200).json("Account deleted");
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};


