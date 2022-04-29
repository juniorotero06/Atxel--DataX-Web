module.exports = (connection, type) => {
  return connection.define("initem", {
    cod_item: {
      type: type.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        notEmpty: true,
        max: 5,
      },
    },
    referencia: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 20,
      },
    },
    descrip: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 100,
      },
    },
    descr_abr: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 20,
      },
    },
    unimed: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 6,
      },
    },
    itm_tipo: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        max: 1,
      },
    },
    tasa_iva: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 2,
      },
    },
    iva_costo: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        max: 1,
      },
    },
    tasaivavta: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 2,
      },
    },
    iva_venta: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        max: 1,
      },
    },
    itm_linea: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 4,
      },
    },
    grupo: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 10,
      },
    },
    itm_lote: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    itm_color: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    itm_ubica: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    itm_kilos: {
      type: type.FLOAT,
      allowNull: false,
    },
    itm_extens: {
      type: type.TEXT,
      allowNull: false,
    },
    uni_adi: {
      type: type.STRING,
      allowNull: false,
      validate: {
        max: 6,
      },
    },
    uni_factor: {
      type: type.FLOAT,
      allowNull: false,
    },
    exp_datax: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        max: 1,
      },
    },
    itm_update: {
      type: type.DATEONLY,
      allowNull: false,
    },
    ult_update: {
      type: type.DATE,
    },
  });
};
