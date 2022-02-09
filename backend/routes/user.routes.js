/**
 * USER ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const express = require('express');
const router = express.Router();

/** import requires js files to use routes */
const userCtrl = require('../controllers/user.controllers');

/** import requires routes js files */
router.post('/signup', userCtrl.signup);

/** EXPORT ***********************************************/
module.exports = router;