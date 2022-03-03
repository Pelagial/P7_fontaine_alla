/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwtUtils = require('../utils/jwt.utils');
const models = require ('../models');
const asyncLib = require ('async');
require("dotenv").config();

const db_import = require("../config/db-config");
const db = db_import.DB();

/** EXPORT ***********************************************/

/** getAllUserProfile ctrl */
module.exports.getAllUserProfile = async (req, res) => {
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
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** selectOneUserProfile ctrl */
module.exports.selectOneUserProfile = async (req, res) => {
  //Get auth header
  headerAuth = req.headers['authorization'];
  userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0)
    return res.status(400).json({ 'error':'wrong token' });
  
  try{
    models.User.findOne({
      attributes: [ 'id', 'email', 'username', 'bio', 'picture' ],
      where: { id: userId }
    }).then(function(user) {
      if (user){
        res.status(201).json(user);
      } else {
        res.status(500).json({ 'error':'user not found' });
      }
    }).catch(function(err){
      res.status(500).json({ 'error':'connot fetch user' });
    })
  } catch {
    return res.status(500).send({ error: "Erreur serveur" });
  }
  
};
  
/** updateUserProfile ctrl */
module.exports.updateUserProfile = async (req, res) => {
  //Get auth header
  headerAuth = req.headers['authorization'];

  try {
    const userId = jwtUtils.getUserId(headerAuth);
    let newPicture;
    let user = await models.User.findOne({ where: { id: id } }); // we found the user
    if (userId === user.id) {
      if (req.file && user.photo) {
        newPicture = `${req.protocol}://${req.get("host")}/api/upload/${
          req.file.filename
        }`;
        const filename = user.picture.split("/upload")[1];
        fs.unlink(`upload/${filename}`, (err) => {
          // if there is already a picture we delete it
          if (err) console.log(err);
          else {
            console.log(`Deleted file: upload/${filename}`);
          }
        });
      } else if (req.file) {
        newPicture = `${req.protocol}://${req.get("host")}/api/upload/${
          req.file.filename
        }`;
      }
      if (newPicture) {
        user.picture = newPicture;
      }
      if (req.body.bio) {
        user.bio = req.body.bio;
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      const newUser = await user.save({ fields: ["username", "bio", "picture"] }); // we save change in ddb
      res.status(200).json({
        user: newUser,
        message: "Votre profil a bien été modifié",
      });
    } else {
      res
        .status(400)
        .json({ message: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

/** deleteUserProfile ctrl */
module.exports.deleteUserProfile = async (req, res) => {
    //Get auth header
    headerAuth = req.headers['authorization'];
    userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0){
      return res.status(400).json({ 'error':'wrong token' });
    }

    try{
      // Waterfall function
      models.User.findOne({
        where: { id: userId }
      }).then(function(user) {
        if (user){
          models.User.destroy(
            { where: { id: userId }}, 
            { truncate: true }
          );
        } else {
          res.status(500).json({ 'error':'user not found' });
        }
      }).catch(function(err){
        res.status(500).json({ 'error':'cannot found user' });
      })
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

