/**
 * USER PROFILE ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const router = express.Router();

/** import requires js files to use routes */
const profileCtrl = require('../controllers/profile.controllers');

/** import requires routes js files */
router.get('/', profileCtrl.getAllUserProfile);
router.get('/:id', profileCtrl.selectOneUserProfile);
router.put('/:id',profileCtrl.updateUserProfile);
router.delete('/:id', profileCtrl.deleteUserProfile);

/** EXPORT ***********************************************/
module.exports = router;