/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const router = express.Router();

/** import requires js files to use routes */
const publicationCtrl = require('../controllers/publication.contollers');
const upload = require ('../middlewares/multer-config');

/** import requires routes js files */
router.post('/post', upload.single('uploadimage'), publicationCtrl.creatPublication);
router.get('/', publicationCtrl.getAllPublication);
router.get('/:id', publicationCtrl.getOnePublication);
router.put('/:id', publicationCtrl.updatePublication);
router.delete('/:id', publicationCtrl.deletePublication);

// Like Dislike
router.post('/like', publicationCtrl.like);
router.delete('/dislike/:id', publicationCtrl.dislike);

/** EXPORT ***********************************************/
module.exports = router;