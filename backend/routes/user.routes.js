/**
 * USER ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require('express').Router();

/** import requires js files to use routes */
const userCtrl = require("../controllers/user.controllers");
const authUser = require("../middlewares/authUser");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

/** import requires routes js files */
/** signup */
router.post("/signup", authUser.checkPseudo, authUser.valid, userCtrl.signup);

/** login */
router.post("/login", authUser.valid, userCtrl.login);

/** accounts routes */
router.get("/accounts", auth, userCtrl.getAllUsers);
router.put("/accounts/:id", auth, multer, userCtrl.updateAccount);
router.get("/accounts/:id", auth, userCtrl.getAccount);
router.delete("/accounts/:id", auth, userCtrl.deleteAccount);

/** EXPORT ***********************************************/
module.exports = router;