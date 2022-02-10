const Sequalize = require("sequelize");
require("dotenv").config();

const UserModel = require("./models/User");
const RolModel = require("./models/Rol")
const LicenseModel = require("./models/License");
const AdminModel = require("./models/Admin");

const sequialize = new Sequalize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

const User = UserModel(sequialize,Sequalize);
const Rol = RolModel(sequialize, Sequalize);
const License = LicenseModel(sequialize, Sequalize);
const Admin = AdminModel(sequialize, Sequalize);

//Asociasiones y claves foraneas
User.belongsTo(Rol,{ foreingKey: "rolKey"});
Rol.hasMany(User, { foreingKey: "rolKey"});

User.belongsToMany(License, { through: "user_license" });
License.belongsToMany(User, { through: "user_license" });


sequialize.sync({ force: false }).then(() => {
    console.log("Base de datos conectada");
})

module.exports = {
    User,
    Rol,
    License
}