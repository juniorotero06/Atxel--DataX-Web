'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      let rols = [
        {
          rolName: "user",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rolName: "administrative",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          rolName: "accountant",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ];

      await queryInterface.bulkInsert('rols', rols, {});
   
  },

  async down (queryInterface, Sequelize) {
    
     
      await queryInterface.bulkDelete('rols', null, {});
  
  }
};
