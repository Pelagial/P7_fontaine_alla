/**
 * USER CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require ('../models');
const asyncLib = require ('async');
require("dotenv").config();

const db_import = require('../config/db-config');
const db = db_import.DB();

/** PARAMS ***********************************************/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

/** EXPORT ***********************************************/

/** Signup ctrl */
/** Hash the password and send it with the email to DDB */
module.exports.signUp = async (req, res) => {
  // Params
    email = req.body.email;
    username = req.body.username;
    password = req.body.password;
    bio = req.body.bio;

    if (email == null || username == null || password == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (username.length >= 13 || username.length <= 4) {
      return res.status(400).json({ 'error': 'wrong username (lenght must be between 5 - 12 characters)' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ 'error': 'email is not valid' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({ 'error': 'invalid password (lenght must be between 4 - 8 characters and include at list & number)' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          attributes: ['email'],
          where: { email: email }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if (!userFound) {
          bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
            done(null, userFound, bcryptedPassword);
          });
        } else {
          return res.status(409).json({ 'error': 'user already exist' });
        }
      },
      function(userFound, bcryptedPassword, done) {
        var newUser = models.User.create({
          email: email,
          username: username,
          password: bcryptedPassword,
          bio: bio,
          isAdmin: 0
        })
        .then(function(newUser) {
          done(newUser);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'cannot add user' });
        });
      }
    ], function(newUser) {
      if (newUser) {
        return res.status(201).json({
          'userId': newUser.id
        });
      } else {
        return res.status(500).json({ 'error': 'cannot add user' });
      }
    });
};

/** signIn ctrl */
module.exports.signIn = async (req, res) => {
  // Params
    const email = req.body.email;
    const password = req.body.password;
  
    if (email == null || password == null ) {
      return res.status(400).json({ 'error': 'missing parameters'});
    } 

    // Waterfall function
    asyncLib.waterfall([
      function(done){
        models.User.findOne({
          where: { email: email }
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
          bcrypt.compare(password, userFound.password, function( errBycrypt, resBycrypt ){
            done(null, userFound,resBycrypt);
          });
        } else {
          return res.status(409).json({ 'error':'user not exist' });
        }
      },
      function(userFound, resBycrypt, done){
        if(resBycrypt){
          done(userFound);
        } else {
          return res.status(403).json({ 'error': 'invalid password' });
        }
      }],
      function(userFound) {
      if (userFound) {
        return res.status(201).json({
          'userId': userFound.id,
          'token': jwtUtils.generateTokenForUser(userFound)
        });
      } else {
        return res.status(500).json({ 'error': 'cannot log on user' });
      }
    });
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