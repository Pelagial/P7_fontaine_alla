/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const publicationCtrl = require('../controllers/post.controllers');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

/** import requires routes js files */
router.post('/post', multer, publicationCtrl.createPublication);
router.get('/', publicationCtrl.getAllPublication);
router.get('/myPub', publicationCtrl.getAllPublicationFromOneUser);
router.delete('/:id', publicationCtrl.deletePublication);
router.get('/:id', publicationCtrl.getOnePublication);


// Like Dislike
router.post('/:id/like', publicationCtrl.like);


/** EXPORT ***********************************************/
module.exports = router;