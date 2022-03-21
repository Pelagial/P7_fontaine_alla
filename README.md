# P7_fontaine_allan

This is my last project for the Openclassrooms Web develloper formation

# Groupomania Social Network # 

# Api #

The stack:
- NodeJS 12.14 or 14.0.
- Express 4.17.2.
- Sequelize 6.16.2.

## Use ##

- Run npm install
- Run nodemon 
(You should see in your terminal
Listening on port 'your .env PORT'
If there is any probleme check your dependencies)

# Database #

1- Connect to your Mysql server.
(If need check for identifiers in config.json file in api/config folder)
2- Execute : `CREATE DATABASE database_development_Groupomania;`
3- In the api terminal Execute : `sequelize db:migrate`
(The database should now have two new tables (Posts & Users) if not check your dependencies)


# Frontend #

The stack:
- VueJS 3.2.29.
- Sass 1.49.7.

## Use ##

- Run npm install
- Npm run dev
And go to this location in your navigator:

http://localhost:3000/
