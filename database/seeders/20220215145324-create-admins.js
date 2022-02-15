'use strict';
const bcrypt = require("bcrypt");
const salt = 10;

module.exports = {
  async up (queryInterface, Sequelize) {
      let admins = [
        {
          name: "Kevin",
          lastname: "Burbano",
          email: "kevin@gmail.com",
          password: bcrypt.hashSync("kevin123456", salt),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Alejandro",
          lastname: "Garzon",
          email: "alejo@gmail.com",
          password: bcrypt.hashSync("alejo123456", salt),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Luis",
          lastname: "Osorio",
          email: "luis@gmail.com",
          password: bcrypt.hashSync("luis123456", salt),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      await queryInterface.bulkInsert('admins', admins, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('admins', null, {});
    
  }
};
