module.exports = (connection, type) => {
  return connection.define("ingrupo", {
    tipo_gru: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 2,
      },
    },
    codigo_gru: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 8,
      },
    },
    desc_gru: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 40,
      },
    },
    clase_gru: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 1,
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
