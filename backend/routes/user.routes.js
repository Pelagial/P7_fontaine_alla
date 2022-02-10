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
/** signup */
router.post('/signup', userCtrl.signUp);

/** login,logout  */
router.post('/login', userCtrl.signIn);
router.get('/logout', userCtrl.logOut);


/** EXPORT ***********************************************/
module.exports = router;