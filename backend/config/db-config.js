const mysql = require("mysql")

// Create connexion
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : "mydb"
  });
  
 module.exports.DB = () => {
     return db
 }