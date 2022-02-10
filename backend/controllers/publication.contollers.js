/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const db_import = require("../config/db-config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** creatPublication ctrl */
module.exports.creatPublication = async (req, res) => {
    try {
      const post = ({
        textContent: req.body.textContent,
        uploadmedia: req.body.uploadmedia
      })
      const sql = `INSERT INTO publications SET ?'`;
      db.query(sql, post, (err, result) => {
        if (!result) {
          res.status(400).json({ message: "Un problème est survenue merci de réessayer ulterieurment" });
          throw err;
        } else {
          res.status(201).json({ message: "Publication effectuée !" });
        }
      });
    }
    catch (err) {
      res.status(500).json({ message: "Failed publication" });
      throw err
    }
  };
/** getAllPublication ctrl */
module.exports.getAllPublication = async (req, res) => {
  try {
    const sql = 'SELECT `create_time`, `email`, `idusers`, `pictures`, `username` FROM users';
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

/** getOnePublication ctrl */
module.exports.getOnePublication = async (req, res) => {
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

/** updatePublication ctrl */
module.exports.updatePublication = async (req, res) => {
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

/** deletePublication ctrl */
module.exports.deletePublication = async (req, res) => {
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


