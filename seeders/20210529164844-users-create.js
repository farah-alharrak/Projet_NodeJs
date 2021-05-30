'use strict';

//const { ForeignKeyConstraintError } = require("sequelize/types");

function dbconnect(){
  var mysql = require('mysql2')
  var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'farah'

  });
  
  connection.connect();
  return connection
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */  
  
  var db = dbconnect()
  
  var faker = require('faker');
  faker.locale = 'fr';
  
  
  
  var username = faker.name.findName(); 
  var email = faker.internet.email();
  var password = faker.internet.password();
  var role = faker.random.arrayElement(['admin', 'author', 'guest', 'guest', 'guest', 'author','author', 'guest'])
  var createdAt = faker.date.past();
  var updatedAt = faker.date.recent();
  
  db.query('INSERT INTO users SET( username, email, password, role, createdAt, updateAt)')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
