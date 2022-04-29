module.exports = (connection, type) => {
  return connection.define("insaldo", {
    cod_sdo: {
      type: type.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        max: 5,
      },
    },
    bod_sdo: {
      type: type.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        max: 2,
      },
    },
    actual_sdo: {
      type: type.FLOAT,
      allowNull: false,
    },
    pdv_sdo: {
      type: type.FLOAT,
      allowNull: false,
    },
    sdo_asigpd: {
      type: type.FLOAT,
      allowNull: false,
    },
    ult_update: {
      type: type.DATE,
    },
  });
};
