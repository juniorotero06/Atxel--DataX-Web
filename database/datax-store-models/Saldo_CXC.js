module.exports = (connection, type) => {
  return connection.define("saldo_cxc", {
    empresa: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 2,
      },
    },
    cng: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 2,
      },
    },
    tercero: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 15,
      },
    },
    tercero_nom: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 80,
      },
    },
    dcmnto: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 12,
      },
      fecha: {
        type: type.DATEONLY,
        allowNull: false,
      },
      vence: {
        type: type.DATEONLY,
        allowNull: false,
      },
      saldo: {
        type: type.FLOAT,
        allowNull: false,
      },
      ult_update: {
        type: type.DATE,
      },
    },
  });
};
