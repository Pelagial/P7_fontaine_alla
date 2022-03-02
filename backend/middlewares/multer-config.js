/**
 * MULTER MIDDLEWARE SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const multer = require('multer');


/** PARAMS ***********************************************/

/** Mime types def */
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image.gif": "gif",
  "image.webp": "webp",
};

/** EXPORT ***********************************************/

/** Export images files from user to DDB */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // destination des images
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    // nouveau nom du fichier image pour éviter les doublons
    const name = file.originalname.replace(/\.[^/.]+$/, "");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ 
  storage: storage, 
  limits: {fileSize : '1000000'}
}).single("image");

