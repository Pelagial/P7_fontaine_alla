/**
 * USER ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const userCtrl = require('../controllers/user.controllers');
const profileCtrl = require('../controllers/profile.controllers');
const multer = require('../middlewares/multer-config');

/** import requires routes js files */
/** signup */
router.post('/signup', userCtrl.signUp);

/** login */
router.post('/login', userCtrl.signIn);

/** profile routes */
router.get('/profile/me', profileCtrl.selectOneUserProfile);
router.put('/profile/me', multer, profileCtrl.updateUserProfile);
router.delete('/profile/me', profileCtrl.deleteUserProfile);


/** EXPORT ***********************************************/
module.exports = router;