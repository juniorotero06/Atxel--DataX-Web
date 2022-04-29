const InItem = require("../../database/config/datax-store-config").InItem;
const InBodega = require("../../database/config/datax-store-config").InBodega;
const InLinea = require("../../database/config/datax-store-config").InLinea;
const InSaldo = require("../../database/config/datax-store-config").InSaldo;
const connection =
  require("../../database/config/datax-store-config").connection;

exports.getBalance = async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  if (req.body.bodega != "" || req.body.bodega != null) {
    const bodega = await InBodega.findOne({
      where: { des_bod: req.body.bodega },
    });
    if (!bodega) return res.status(400).json({ error: "Bodega no encontrada" });

    const [results] = await connection.query(
      `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.bod_sdo = ${
        bodega.cod_bod
      } ORDER BY b.cod_sdo ASC LIMIT ${size} OFFSET ${page * size}`
    );

    const [totalResults] = await connection.query(
      `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.bod_sdo = ${bodega.cod_bod} ORDER BY b.cod_sdo ASC`
    );

    res.send({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },

      // TODO Buscar por Código del saldo, Nombre del producto, Linea, Saldos <0 || =0 || >0
    });
  }
};
