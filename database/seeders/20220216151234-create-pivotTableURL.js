'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      let url = [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: 1,
          RolId: 2,
          LicenseId: 1
        }
      ];
      await queryInterface.bulkInsert('user_rol_licenses', url, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('user_rol_licenses', null, {});
     
  }
};
