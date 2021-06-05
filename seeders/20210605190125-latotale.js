'use strict';
const { date } = require('faker');
  
 var faker = require('faker');
 faker.locale = 'fr';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /// génerer les utilisateurs ///

     let users = Array();
     for (let index = 0; index < 20; index++) {
       var usernamee = faker.name.findName(); 
       var emaill = faker.internet.email();
       var passwordd = faker.internet.password();
       var rolee = faker.random.arrayElement(['admin', 'author', 'guest', 'guest', 'guest', 'author','author', 'guest'])
       var createdAtt = faker.date.between(2000,2021)   
       var updatedAtt = faker.date.recent();   /// pour avoir une date récente de mise à jour
         let data2 = {
         username: usernamee , 
         email: emaill,
         password: passwordd,
         role: rolee,
         createdAt: createdAtt,
         updatedAt: updatedAtt
       }
 
       users[index] = data2;
     
     }
     
     await queryInterface.bulkInsert('users',
     users, {});

     /// génerer des tags ////
      let tags = Array();
      for (let index = 0; index < 10; index++){
        let namee = faker.lorem.words(3);   /// 3 mots pour chaque tag
        var createdAtt = faker.date.between(2000,2021)   
        var updatedAtt = faker.date.recent();
        
        let data3 = {name: namee,
                      createdAt: createdAtt,
                      updatedAt: updatedAtt
        }

        tags[index] = data3 ;

      }
      await queryInterface.bulkInsert('tags',tags, {});

      /// Chaque utilisateur aura créé au moins 2 articles et au plus 10 articles /// 

      let articles= Array();
      for (let index = users.length - 1; index >= 0; index--){
          let num = parseInt(Math.random()*8 +2 )  /// au moins 2
          let date_u = users[index].createdAt;
          while(num!= 1){
            num--;
            let ftitle = faker.name.title();
            let fcontent =  faker.lorem.paragraph();
            let fpublished = faker.date.between(date_u,2021);
            let fcreated = faker.date.between(date_u,2021);
            let fupdate = faker.date.recent();
            let  uId = users[index].id;
            let data4= {
              title: ftitle,
              content: fcontent,
              published: fpublished,
              createdAt: fcreated,
              updatedAt: fupdate,
              userId: uId
            }

            articles[index] = data4;
          }
  
      }

      await queryInterface.bulkInsert('articles',articles, {});

      /// Chaque article est taggé avec entre 2 et 6 tags
      let tagarticles= Array();
      for(let index = articles.length - 1; index >= 0; index--){
        let num = parseInt(Math.random()*6+2);
        while(num!=1){
          num--;
          let fcreated = faker.date;
          let fupdate = faker.date.recent();
          let idA = articles[index].id;
          let idT = tag[parseint(Math.random()*10)].id;
          let data5 = {
            createdAt = fcreated,
            updatedAt = fupdate,
            ArticleId: idA,
            TagId: idT
          }
          tagarticles[index] = data5;

        }
      }
      
      await queryInterface.bulkInsert('tagarticles',tagarticles, {});

/// Chaque article est commenté avec entre 0 et 10 commentaires. ///
      let comments = Array();
      for(let index = articles.length - 1; index >= 0; index--){
        let num = parseInt(Math.random()*10);
        while(num>= 0){
          num--;
          let fcontent = faker.lorem.sentence(10);
          let fcreated = faker.date;
          let fupdated = faker.date.between(fcreated,now());
          let idA = articles[index].id;
          let data6 = {
            content: fcontent,
            createdAt: fcreatedAt,
            updatedAt: fupdatedAt,
            ArticleId: idA
          }
          comments[index] = data6;

        }
      }

      await queryInterface.bulkInsert('comments',comments, {})





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
