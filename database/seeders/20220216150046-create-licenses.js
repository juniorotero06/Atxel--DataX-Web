'use strict';
const bcrypt = require("bcrypt");
const salt = 10;

module.exports = {
  async up (queryInterface, Sequelize) {

      let licenses = [
        {
          companyName: "Atxel",
          address: "Calle#1a8-17",
          email: "atxel@gmail.com",
          phone: 123456,
          activo: 1,
          host: "atxel.com/host",
          bdUser: "pruebaDb",
          bdPass: bcrypt.hashSync("atxel123456", salt),
          bdName: "atxelDb",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      await queryInterface.bulkInsert('licenses', licenses, {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('licenses', null, {});
     
  }
};
