const Sequelize = require("sequelize");
require("dotenv").config();

const UserModel = require("../models/User");
const RolModel = require("../models/Rol");
const LicenseModel = require("../models/License");
const UserRolLicenseModel = require("../models/User_Rol_License");
const AdminModel = require("../models/Admin");

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const User = UserModel(sequelize, Sequelize);
const Rol = RolModel(sequelize, Sequelize);
const License = LicenseModel(sequelize, Sequelize);
const UserRolLicense = UserRolLicenseModel(sequelize, Sequelize);
const Admin = AdminModel(sequelize, Sequelize);

//Asociasiones y one to many
User.hasMany(UserRolLicense)
UserRolLicense.belongsTo(User)

Rol.hasMany(UserRolLicense)
UserRolLicense.belongsTo(Rol)

License.hasMany(UserRolLicense)
UserRolLicense.belongsTo(License)

sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos conectada");
});

module.exports = {
  User,
  Rol,
  License,
  Admin,
  UserRolLicense,
  sequelize,
};
