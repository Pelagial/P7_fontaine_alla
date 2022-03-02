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
const { userInfo } = require('os');
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
    res.status(400).send({ err })
  }
};

/** selectOneUserProfile ctrl */
module.exports.selectOneUserProfile = async (req, res) => {
  //Get auth header
  headerAuth = req.headers['authorization'];
  userId = jwtUtils.getUserId(headerAuth);

  if (userId < 0)
    return res.status(400).json({ 'error':'wrong token' });

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
};
  
/** updateUserProfile ctrl */
module.exports.updateUserProfile = async (req, res) => {
  //Get auth header
  headerAuth = req.headers['authorization'];
  userId = jwtUtils.getUserId(headerAuth);

  // Params
  username = req.body.username;
  bio = req.body.bio;

    
  
  // Waterfall function
  asyncLib.waterfall([
    function(done){
      models.User.findOne({
        attributes:[ 'id', 'bio', 'picture', 'username','isAdmin' ],
        where: { id: userId }
      })
      .then(function(userFound){
        done(null, userFound);
      })
      .catch(function(err){
        return res.status(400).json({ 'error': 'unable to find user'});
      })
    },
    function(userFound, done){
      if (userFound){
        userFound.update({
          username: (username ? username: userFound.username),
          bio: (bio ? bio: userFound.bio)
        }).then(function(){
          done(userFound);
        })
        .catch(function(err){
          return res.status(500).json({ 'error': 'cannot update user'});
        });
      } else {
        return res.status(404).json({ 'error': 'user not found'});
      }
    }],function(userFound){
      if(userFound){
        return res.status(201).json(userFound);
      } else {
        return res.status(500).json({ 'error':'connot update user profile' });
      }
    });
};

/** deleteUserProfile ctrl */
module.exports.deleteUserProfile = async (req, res) => {
    //Get auth header
    headerAuth = req.headers['authorization'];
    userId = jwtUtils.getUserId(headerAuth);

    if (userId < 0)
    return res.status(400).json({ 'error':'wrong token' });

    // Waterfall function
    models.User.findOne({
      where: { id: userId }
    }).then(function(user) {
      if (user){
        models.User.destroy({
          where: { id: userId }
        });
      } else {
        res.status(500).json({ 'error':'user not found' });
      }
    }).catch(function(err){
      res.status(500).json({ 'error':'cannot found user' });
    })
};

