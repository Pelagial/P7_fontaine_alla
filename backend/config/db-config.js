const mysql = require("mysql")

// Create connexion
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : "database_development_Groupomania"
  });
  
 module.exports.DB = () => {
     return db
 }