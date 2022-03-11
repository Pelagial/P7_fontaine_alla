/**
 * PUBLICATION CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const token = require('../middlewares/token');
const db = require('../models'); // acces tables models
const fs = require('fs');


/** EXPORT ***********************************************/

/** creatPost ctrl */
exports.createPost = async (req, res) => {
  const userId = token.getUserId(req);
  let imageUrl;
  try {
    const user = await db.User.findOne({
      attributes: ["pseudo", "id", "photo"],
      where: { id: userId },
    });
    if (user !== null) {
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/upload/${req.file.filename}`;
      } else {
        imageUrl = null;
      }
      const post = await db.Post.create({
        include: [
          {
            model: db.User,
            attributes: ["pseudo", "photo", "id"],
          },
        ],
        message: req.body.message,
        title: req.body.title,
        imageUrl: imageUrl,
        UserId: user.id,
      });
      res
        .status(201)
        .json({ post: post, messageRetour: "Votre post est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** deletePost ctrl */
exports.deletePost = async (req, res) => {
  try {
    const userId = token.getUserId(req);
    const checkAdmin = await db.User.findOne({ where: { id: userId } });
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (userId === post.UserId || checkAdmin.admin === true) {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          db.Post.destroy({ where: { id: post.id } });
          res.status(200).json({ message: "Post supprimé" });
        });
      } else {
        db.Post.destroy({ where: { id: post.id } }, { truncate: true });
        res.status(200).json({ message: "Post supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** getAllPost ctrl */
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      attributes: ["id","title", "message", "imageUrl", "link", "createdAt"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "id", "photo"],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({
      error: "Une erreur est survenu lors de la récupération des posts ",
    });
  }
};

/** getOnePost ctrl */
exports.getOnePost = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      // on récupère le post avec l'id fourni en incluant les tables et attributs nécessaires
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          attributes: ["pseudo", "photo", "id"],
        }
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};







