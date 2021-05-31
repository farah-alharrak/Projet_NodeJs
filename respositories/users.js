//const { UniqueConstraintError } = require('sequelize/types')
//const { SELECT } = require('sequelize/types/lib/query-types')
const { User } = require('../models')
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("farah", "root", "", {
    dialect: "mysql",
    host: "localhost"
});


module.exports = {
    getAllUsers() {
        return User.findAll()
        },
        // méthodes à implémenter
        getUsers(offset = 0, limit = 10) { },
        getAdmins() { },
        getAuthors() { },
        getGuests(){ },
        getUser(id) { },
        getUserByEmail(email) { },
        addUser(user) { },
        updateUser() { },
        deleteUser() { },
        // D'autres méthodes jugées utiles
        }

        function getAdmins() {
            sequelize.query("SELECT id from users where role='admin'").then(([results, metadata]) => {
                console.log(results);
              })
        }
        
        function getAuthors() {
            sequelize.query("SELECT username from users where role='author'").then(([results, metadata]) => {
                console.log(results);
              })
        }

        function getGuests() {
            sequelize.query("SELECT id from users where role='guest'").then(([results, metadata]) => {
                console.log(results);
              })
        }
        
      