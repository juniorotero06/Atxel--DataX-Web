module.exports = (connection, type) => {
  return connection.define("inbodega", {
    cod_bod: {
      type: type.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        max: 2,
      },
    },
    des_bod: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 40,
      },
    },
    infor_bod: {
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
      allowNull: false,
    },
  });
};
