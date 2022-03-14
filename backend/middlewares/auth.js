/**
* AUTH MIDDLEWARE SETTINGS ***********************************************************************************
*/

/** IMPORT ***********************************************/

/** General import */
const jwt = require('jsonwebtoken');


/** EXPORT ***********************************************/
module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1]; // get the token from request
        const decodedToken = jwt.verify(token, 'secret'); // check if token is valid
        const userId = decodedToken.sub;         // get the userId in token
        if (req.body.userId && req.body.userId !== userId) { // compare if userId in token and in request token is the same
            throw 'User id non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: new Error('Invalid request !') });
    }
};


