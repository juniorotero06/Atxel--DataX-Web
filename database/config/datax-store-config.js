const Sequelize = require("sequelize");
require("dotenv").config();

const InItemModel = require("../datax-store-models/InItem");
const InBodegaModel = require("../datax-store-models/InBodega");
const InLineaModel = require("../datax-store-models/InLinea");
const InSaldoModel = require("../datax-store-models/InSaldo");

const connection = new Sequelize(
  process.env.DATXSTRDB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  }
);

const InItem = InItemModel(connection, Sequelize);
const InBodega = InBodegaModel(connection, Sequelize);
const InLinea = InLineaModel(connection, Sequelize);
const InSaldo = InSaldoModel(connection, Sequelize);

connection.sync({ force: false }).then(() => {
  console.log("Base de datos datax store conectada");
});

module.exports = {
  InItem,
  InBodega,
  InLinea,
  InSaldo,
  connection,
};
