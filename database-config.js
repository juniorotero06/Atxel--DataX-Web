const Sequelize = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/User");
const RolModel = require("./models/Rol")
const LicenseModel = require("./models/License");
const AdminModel = require("./models/Admin");

const sequelize = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

const User = UserModel(sequelize,Sequelize);
const Rol = RolModel(sequelize, Sequelize);
const License = LicenseModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);

//Asociasiones y claves foraneas
User.belongsTo(Rol,{ foreingKey: "rolKey"});
Rol.hasMany(User, { foreingKey: "rolKey"});

User.belongsToMany(License, { through: "user_license" });
License.belongsToMany(User, { through: "user_license" });


sequelize.sync({ force: false }).then(() => {
    console.log("Base de datos conectada");
})

module.exports = {
    User,
    Rol,
    License,
    Admin,
    sequelize
}