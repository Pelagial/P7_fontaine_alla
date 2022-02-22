/**
 * PUBLICATION CTRL SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwtUtils = require('../utils/jwt.utils');
const models = require ('../models');
const asyncLib = require ('async');

/** PARAMS ***********************************************/
const TITLE_LIMIT = 2;
const MESSAGE_LIMIT = 4;

/** EXPORT ***********************************************/

/** creatPublication ctrl */
module.exports.creatPublication = async (req, res) => {
  // Getting auth header
    const headerAuth  = req.headers['authorization'];
    const userId      = jwtUtils.getUserId(headerAuth);

  // Params
    const title   = req.body.title;
    const message = req.body.message;
    const attachment = req.body.attachment;

    if (title == null || message == null) {
      return res.status(400).json({ 'error': 'missing parameters' });
    }

    if (title.length <= TITLE_LIMIT || message.length <= MESSAGE_LIMIT) {
      return res.status(400).json({ 'error': 'invalid parameters' });
    }

    asyncLib.waterfall([
      function(done) {
        models.User.findOne({
          where: { id: userId }
        })
        .then(function(userFound) {
          done(null, userFound);
        })
        .catch(function(err) {
          return res.status(500).json({ 'error': 'unable to verify user' });
        });
      },
      function(userFound, done) {
        if(userFound) {
          models.Publication.create({
            title  : title,
            message: message,
            attachment: attachment,
            likes  : 0,
            UserId : userFound.id
          })
          .then(function(newPublication) {
            done(newPublication);
          });
        } else {
          res.status(404).json({ 'error': 'user not found' });
        }
      },
    ], function(newPublication) {
      if (newPublication) {
        return res.status(201).json(newPublication);
      } else {
        return res.status(500).json({ 'error': 'cannot post publication' });
      }
    });
};

  
/** getAllPublication ctrl */
module.exports.getAllPublication = async (req, res) => {
  // Params
  fields = req.query.fields;
  limit = parseInt(req.query.limit);
  offset = parseInt(req.query.offset);
  order = req.query.order;

  models.Publication.findAll({
    order: [(order != null) ? order.split(':') : ['title', 'ASC']],
    attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
    limit: (!isNaN(limit)) ? limit : null,
    offset: (!isNaN(offset)) ? offset : null,
    include: [{
      model: models.User,
      attributes: [ 'username' ]
    }]
  }).then(function(publication) {
    if (publication) {
      res.status(200).json(publication);
    } else {
      res.status(404).json({ "error": "no publication found" });
    }
  }).catch(function(err) {
    console.log(err);
    res.status(500).json({ "error": "invalid fields" });
  });
};

/** getOnePublication ctrl */
module.exports.getOnePublication = async (req, res) => {

};

/** updatePublication ctrl */
module.exports.updatePublication = async (req, res) => {

};

/** deletePublication ctrl */
module.exports.deletePublication = async (req, res) => {

};

/** likes part ***********************************************/

/** likes ctrl */
module.exports.like = async (req, res) => {

};




