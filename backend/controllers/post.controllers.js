/**
 * PUBLICATION CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const models = require ('../models');
const asyncLib = require ('async');
const fs = require("fs");

/** PARAMS ***********************************************/
const TITLE_LIMIT = 2;
const MESSAGE_LIMIT = 4;

/** EXPORT ***********************************************/

/** creatPublication ctrl */

exports.createPublication = async (req, res) => {
  // Getting auth header
  const headerAuth = req.headers['authorization'];
  const userId = jwtUtils.getUserId(headerAuth);
  
  // Params
  const title =req.body.title;
  console.log(title);
  const message =req.body.message;
  console.log(message);
  const imageUrl =`${req.protocol}://${req.get("host")}/backend/upload/${req.file.filename}`;
  console.log(imageUrl);

  if (title == null || message == null) {
    return res.status(400).json({ 'error': 'missing parameters' });
  }

  if (title.length <= TITLE_LIMIT || message.length <= MESSAGE_LIMIT) {
    return res.status(400).json({ 'error': 'invalid parameters' });
  }

  try {
    const user = await models.User.findOne({
      attributes: ["username", "id", "imageUrl"],
      where: { id: userId },
    });
    console.log(user);
    if (user) {
      newPublication = models.Publication.create({
        include: [
          {
            model: models.User,
            attributes: ["username", "id", "imageUrl"],
          },
        ],
        message: message,
        title: title,
        imageUrl: imageUrl,
        UserId: user.id,
      });
      console.log(publication);
      res
        .status(201)
        .json({ publication: publication, messageRetour: "Votre publication est ajouté" });
    } else {
      res.status(400).send({ error: "Erreur " });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
  
/** getAllPublication ctrl */
module.exports.getAllPublication = async (req, res) => {
  // Params
  order = req.query.order;
  try{
    models.Publication.findAll({
      order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
      include: [{
        model: models.User,
        attributes: [ 'username','imageUrl' ]
      }]
    }).then(function(publication) {
      if (publication) {
        res.status(200).send(publication);
      } else {
        res.status(404).json({ "error": "no publication found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** getOnePublication ctrl */
module.exports.getOnePublication = async (req, res) => {
  try {
    const publication = await models.Publication.findOne({
      // We search for the publication with the id (including all attributes we need)
      where: { id: req.params.id },
      include: [{
        model: models.User,
        attributes: [ 'username','imageUrl' ]
      }]
    });
    res.status(200).json(publication);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** getAllPublicationFromOneUser ctrl */
module.exports.getAllPublicationFromOneUser = async (req, res) => {
  const headerAuth = req.headers['authorization'];
  const userId = jwtUtils.getUserId(headerAuth);
  
  // Params
  order = req.query.order;
  try{
    models.Publication.findAll({
      where: { UserId: userId },
      order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
      include: [{
        model: models.User,
        attributes: [ 'username','imageUrl' ]
      }]
    }).then(function(publication) {
      if (publication) {
        res.status(200).send(publication);
      } else {
        res.status(404).json({ "error": "no publication found" });
      }
    }).catch(function(err) {
      console.log(err);
      res.status(500).json({ "error": "invalid fields" });
    });
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** deletePublication ctrl */
module.exports.deletePublication = async (req, res) => {
  try {
    const headerAuth = req.headers['authorization'];
    const userId = jwtUtils.getUserId(headerAuth);
    const checkAdmin = await models.User.findOne({ where: { id: userId }});
    const publication = await models.Publication.findOne({ where: { id: req.params.id } });
    if (userId === publication.UserId || checkAdmin.isAdmin === true) {
      if (publication.imageUrl) {
        const filename = publication.imageUrlt.split("/upload")[1];
        fs.unlink(`upload/${filename}`, () => {
          models.Publication.destroy({ where: { id: publication.id } });
          res.status(200).json({ message: "Publication supprimé" });
        });
      } else {
        models.Publication.destroy({ where: { id: publication.id } }, { truncate: true });
        res.status(200).json({ message: "Publication supprimé" });
      }
    } else {
      res.status(400).json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};


/** likes part ***********************************************/

/** likes ctrl */
module.exports.like = async (req, res) => {

};




