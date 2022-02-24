module.exports = (sequelize, type) => {
  return sequelize.define("License", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    companyName: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phone: {
      type: type.STRING,
    },
    activo: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    host: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
    bdUser: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
    bdPass: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
    bdName: {
      type: type.STRING,
      validate: {
        notEmpty: true,
      },
    },
  });
};
