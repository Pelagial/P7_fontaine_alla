/**
 * UTILS SETTINGS ***********************************************************************************
 */

/** IMPORT ***********************************************/

/** General import */
const jwt = require('jsonwebtoken');
require("dotenv").config();

/** EXPORT ***********************************************/

/** Exported function */
 module.exports = {
    generateTokenForUser(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        process.env.JWT_SECRET_TOKEN,
        { 
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ','') : null;
    },
    getUserId:function(authorization){
        userId = -1;
        token =module.exports.parseAuthorization(authorization);
        if(token != null){
            try{
                jwtToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
                if(jwtToken != null)
                    userId= jwtToken.userId;  
            } catch (err) {}
            return userId;
        }
            

    }
 }

