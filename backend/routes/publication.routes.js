/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const publicationCtrl = require('../controllers/publication.contollers');
const commentCtrl = require('../controllers/comment.controllers');
const multer = require ('../middlewares/multer-config');

/** import requires routes js files */
router.post('/post', publicationCtrl.creatPublication);
router.get('/', publicationCtrl.getAllPublication);
router.get('/:id', publicationCtrl.getOnePublication);
router.put('/:id', publicationCtrl.updatePublication);
router.delete('/:id', publicationCtrl.deletePublication);

// Like Dislike
router.post('/:id/like', publicationCtrl.like);

// Commment
router.post('"/:id/comments"', commentCtrl.creatComment);
router.delete('/comments/:id', commentCtrl.deleteComment);

/** EXPORT ***********************************************/
module.exports = router;