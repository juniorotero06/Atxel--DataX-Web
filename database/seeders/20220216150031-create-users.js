"use strict";
const bcrypt = require("bcrypt");
const salt = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [
      {
        name: "Jose",
        lastname: "Otero",
        password: bcrypt.hashSync("jose123456", salt),
        phone: 3152741291,
        activo: 1,
        email: "jose@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Selene",
        lastname: "Otero",
        password: bcrypt.hashSync("selene123456", salt),
        phone: 3122796633,
        activo: 1,
        email: "selene@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
