const Sequalize = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/User");
const RolModel = require("./models/Rol")
const LicenseModel = require("./models/License");

const sequialize = new Sequalize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

const User = UserModel(sequialize,Sequalize);
const Rol = RolModel(sequialize, Sequalize);
const License = LicenseModel(sequialize, Sequalize);

sequialize.sync({ force: false }).then(() => {
    console.log("Base de datos conectada");
})

module.exports = {
    User
}