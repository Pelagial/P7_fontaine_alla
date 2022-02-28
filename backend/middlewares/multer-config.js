/**
 * MULTER MIDDLEWARE SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const multer = require('multer');
const path = require('path');

/** Import images files from user to DDB */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "attachement") cb (null, "./images/posts/");
    else if (file.fieldname === "picture") cb (null, "./images/profils/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

/** EXPORT ***********************************************/
const upload = multer({storage: storage});

module.exports = upload