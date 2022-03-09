/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwtUtils = require('../utils/jwt.utils');
const models = require ('../models');
const asyncLib = require ('async');
require("dotenv").config();

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
      attributes: [ 'id', 'email', 'username', 'bio', 'imageUrl' ],
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
    userId = jwtUtils.getUserId(headerAuth);

    // Params
    const bio = req.body.bio;
    const username = req.body.username;
    const imageUrl = req.file.imageUrl;

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['id', 'bio', 'imageUrl'],
          where: { id: userId }
        }).then(function (userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          userFound.update({
            bio: (bio ? bio : userFound.bio),
            username: (username ? username : userFound.username),
            imageUrl: (imageUrl ? imageUrl : userFound.imageUrl)
          }).then(function() {
            done(userFound);
          }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot update user' });
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(userFound) {
      if (userFound) {
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error': 'cannot update user profile' });
      }
    });
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

