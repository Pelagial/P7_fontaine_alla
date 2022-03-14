/**
* TOKEN MIDDLEWARE SETTINGS ***********************************************************************************
*/

/** IMPORT ***********************************************/

/** General import */
const JWT = require("jsonwebtoken");

function issueJWT(user) {
  // token creation
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, "secret", { expiresIn: expiresIn });
  //In porduction we use process.env.JWT_SECRET_TOKEN insted 'secret'
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
function getUserId(req) {
  // check if userId in token is valid
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = JWT.verify(token, "secret");
  //In porduction we use process.env.JWT_SECRET_TOKEN insted 'secret'
  const userId = decodedToken.sub;
  return userId; // get the userId in token
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;
