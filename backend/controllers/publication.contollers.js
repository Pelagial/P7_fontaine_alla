/**
 * PUBLICATION CTRL SETTINGS ***********************************************************************************
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
      });
      const sql = `INSERT INTO publications (textContent, uploadmedia) VALUES ('${post.textContent}','${post.uploadmedia}');`;
      db.query(sql, (err, result) => {
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
    const sql = 'SELECT * FROM publications ORDER BY create_time DESC ';
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
    const { id: idpublications } = req.params;
    const sql = `SELECT * FROM publications WHERE idpublications = ${idpublications}`;
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
    const { id: idpublications } = req.params;
    const post = ({
        textContent: req.body.textContent,
        uploadmedia: req.body.uploadmedia
      });
    const sql = `UPDATE publications SET textContent = '${post.textContent}', uploadmedia = '${post.uploadmedia}' WHERE idpublications = ${idpublications}`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      res.status(201).json({ message: "Post updated !" });
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};

/** deletePublication ctrl */
module.exports.deletePublication = async (req, res) => {
  try {
    const { id: idpublications } = req.params;
    const sql = `DELETE FROM publications WHERE idpublications = ${idpublications}`;
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(404).json({ err });
      }
      res.status(200).json("Post deleted");
    });
  }
  catch (err) {
    res.status(400).send({ err })
  }
};

/** likes part ***********************************************/

/** likes ctrl */
module.exports.like = async (req, res) => {
  try {
      const sql = `INSERT INTO likesPublications (likeValue) VALUES (1);`;
      db.query(sql, (err, results) => {
          if (err) {
              return res.status(404).json({ err });
          }
          res.status(200).json("Publication like");
      });
  }
  catch (err) {
      res.status(400).send({ err })
  }
};

/** dislikes ctrl */
module.exports.dislike = async (req, res) => {
  try {
      const {id: idlikes} = req.params;
      const sql = `DELETE FROM likesPublications WHERE idlikes = ${idlikes};`;
      db.query(sql, (err, results) => {
          if (err) {
              return res.status(404).json({ err });
          }
          res.status(200).json("Publication dislike");
      });
  }
  catch (err) {
      res.status(400).send({ err })
  }
};


