/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const publicationCtrl = require('../controllers/publication.controllers');
const multer = require('../middlewares/multer-config');

/** import requires routes js files */
router.post('/post', multer, publicationCtrl.creatPublication);
router.get('/', publicationCtrl.getAllPublication);
router.get('/:id', publicationCtrl.getOnePublication);
router.put('/:id', multer, publicationCtrl.updatePublication);
router.delete('/:id', publicationCtrl.deletePublication);

// Like Dislike
router.post('/:id/like', publicationCtrl.like);


/** EXPORT ***********************************************/
module.exports = router;