/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const router = express.Router();

/** import requires js files to use routes */
const commentCtrl = require('../controllers/comment.controllers');

/** import requires routes js files */
// Commment
router.post('/post', commentCtrl.creatComment);
router.get('/', commentCtrl.getAllComment);
router.put('/:id',commentCtrl.updateComment);
router.delete('/:id', commentCtrl.deleteComment);

// Like Dislike
router.post('/like', commentCtrl.like);
router.delete('/dislike/:id', commentCtrl.dislike);

/** EXPORT ***********************************************/
module.exports = router;