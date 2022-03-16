/**
* AUTHUSER MIDDLEWARE SETTINGS ***********************************************************************************
*/

/** IMPORT ***********************************************/

/** General import */
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

/** EXPORT ***********************************************/
exports.valid = (req, res, next) => {
  // check if password and email is valid
  const passwordSchema = new passwordValidator();
  passwordSchema
    .is().min(8) // Minimum length 8
    .is().max(20) // Maximum length 20
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters

  if (
    !emailValidator.validate(req.body.email) ||
    !passwordSchema.validate(req.body.password)
  ) {
    return res.status(400).send({
      error:
        "Merci de vérifier votre adresse mail, votre mot de passe doit contenir au minimum 8 lettres avec des minuscules et majuscules ",
    });
  } else if (
    emailValidator.validate(req.body.email) ||
    passwordSchema.validate(req.body.password)
  ) {
    next();
  }
};
exports.checkPseudo = (req, res, next) => {
  // check if pseudo is valid
  const regex = /^[a-zA-Z0-9_]{3,30}$/; // Lettres, espaces et doit être entre 4 et 30 caractères
  const pseudo = req.body.pseudo;
  if (regex.test(pseudo) === true) {
    next();
  } else {
    return res.status(400).send({
      error:
        "Votre pseudo doit être de 3 caractères minimum et 30 maximum, sont acceptées les lettres, chiffres et underscore (_)  ",
    });
  }
};
