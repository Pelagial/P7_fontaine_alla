/**
 * COMMENT CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const db_import = require("../config/db-config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** creatComment ctrl */
module.exports.creatComment = async (req, res) => {
    try {
        const comment = ({
            usersid: req.body.usersid,
            idpublication: req.body.idpublication,
            comment: req.body.comment,
        });
        const sql = `INSERT INTO comments (userId, publicationId, comment) VALUES ('${comment.usersid}', '${comment.idpublication}','${comment.comment}');`;
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


/** getAllComment ctrl */
module.exports.getAllComment = async (req, res) => {
    try {
        const sql = 'SELECT * FROM comments ORDER BY create_time DESC ';
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

/** updateComment ctrl */
module.exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = ({
            comment: req.body.comment,
        });
        const sql = `UPDATE comments SET comment = '${comment.comment}' WHERE commentId = ${commentId}`;
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

/** deleteComment ctrl */
module.exports.deleteComment = async (req, res) => {
    try {
        const { id: commentId } = req.params;
        const sql = `DELETE FROM comments WHERE commentId = ${commentId}`;
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(404).json({ err });
            }
            res.status(200).json("Comment deleted");
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
        const sql = `INSERT INTO likesComments (likeValue) VALUES (1);`;
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(404).json({ err });
            }
            res.status(200).json("Comment like");
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
        const sql = `DELETE FROM likesComments WHERE idlikes = ${idlikes};`;
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(404).json({ err });
            }
            res.status(200).json("Comment dislike");
        });
    }
    catch (err) {
        res.status(400).send({ err })
    }
};

