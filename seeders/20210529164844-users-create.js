'use strict';

const { date } = require('faker');
//const { ForeignKeyConstraintError } = require("sequelize/types");

  
 var faker = require('faker');
 faker.locale = 'fr';
 
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
    let tab = Array();
    for (let index = 0; index < 20; index++) {
      var usernamee = faker.name.findName(); 
      var emaill = faker.internet.email();
      var passwordd = faker.internet.password();
      var rolee = faker.random.arrayElement(['admin', 'author', 'guest', 'guest', 'guest', 'author','author', 'guest'])
      var createdAtt = faker.date.past();   /// pour avoir une date du passé
      var updatedAtt = faker.date.recent();   /// pour avoir une date récente
        let data2 = {
        username: usernamee ,
        email: emaill,
        password: passwordd,
        role: rolee,
        createdAt: createdAtt,
        updatedAt: updatedAtt
      }

      tab[index] = data2;
    
    }
    
    await queryInterface.bulkInsert('users',
    tab, {});
  
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
