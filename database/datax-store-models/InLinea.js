module.exports = (connection, type) => {
  return connection.define("inlinea", {
    cod_linea: {
      type: type.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        max: 4,
      },
    },
    des_linea: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 40,
      },
    },
    exp_datax: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        max: 1,
      },
    },
    ult_update: {
      type: type.DATE,
    },
  });
};
