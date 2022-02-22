/**
 * USER ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const userCtrl = require('../controllers/user.controllers');
const profileCtrl = require('../controllers/profile.controllers');

/** import requires routes js files */
/** signup */
router.post('/signup', userCtrl.signUp);

/** login,logout  */
router.post('/login', userCtrl.signIn);
router.get('/logout', userCtrl.logOut);

/** profile routes */
router.get('/profile', profileCtrl.getAllUserProfile);
router.get('/profile/me', profileCtrl.selectOneUserProfile);
router.put('/profile/me',profileCtrl.updateUserProfile);
router.delete('/profile/me', profileCtrl.deleteUserProfile);


/** EXPORT ***********************************************/
module.exports = router;