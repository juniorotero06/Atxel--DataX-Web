require('dotenv').config();

module.exports = {
    development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DBNAME,
    host: process.env.HOST,
    dialect: "mysql"
  }
}