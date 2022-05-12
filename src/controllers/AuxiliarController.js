const InBodega = require("../../database/config/datax-store-config").InBodega;
const InLinea = require("../../database/config/datax-store-config").InLinea;
const InGrupo = require("../../database/config/datax-store-config").InGrupo;

exports.getBodegas = async (req, res) => {
  const bodegas = await InBodega.findAll({
    attributes: ["cod_bod", "des_bod"],
  });
  try {
    res.json(bodegas);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getLineas = async (req, res) => {
  const lineas = await InLinea.findAll({
    attributes: ["cod_linea", "des_linea"],
  });
  try {
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getGrupo = async (req, res) => {
  const grupos = await InGrupo.findAll({
    attributes: ["tipo_gru", "codigo_gru", "desc_gru"],
  });
  try {
    res.json(grupos);
  } catch (error) {
    res.status(500).json({ error });
  }
};
