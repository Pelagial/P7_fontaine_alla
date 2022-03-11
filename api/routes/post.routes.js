/**
 * PUBLICATIONS ROUTES AND SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const router = require("express").Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

/** import requires js files to use routes */
const postsCtrl = require("../controllers/post.controllers");

/** import requires routes js files */
router.get("/", auth, postsCtrl.getAllPosts);
router.post("/add", auth, multer, postsCtrl.createPost);
router.get("/:id", auth, postsCtrl.getOnePost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);

/** EXPORT ***********************************************/
module.exports = router;