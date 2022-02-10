/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const router = express.Router();

/** import requires js files to use routes */
const publicationCtrl = require('../controllers/publication.contollers');

/** import requires routes js files */
router.post('/post', publicationCtrl.creatPublication);
router.get('/', publicationCtrl.getAllPublication);
router.get('/:id', publicationCtrl.getOnePublication);
router.put('/:id',publicationCtrl.updatePublication);
router.delete('/:id', publicationCtrl.deletePublication);

/** EXPORT ***********************************************/
module.exports = router;