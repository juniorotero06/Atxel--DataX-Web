const InItem = require("../../database/config/datax-store-config").InItem;
const InBodega = require("../../database/config/datax-store-config").InBodega;
const InLinea = require("../../database/config/datax-store-config").InLinea;
const InSaldo = require("../../database/config/datax-store-config").InSaldo;
const connection =
  require("../../database/config/datax-store-config").connection;

exports.getBalanceByBodega = async (req, res) => {
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

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO Buscar por Código del saldo, Nombre del producto, Linea, Saldos <0 || =0 || >0
exports.getBalanceByCodSaldo = async (req, res) => {
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

  const codSaldo = await InSaldo.findOne({
    where: { cod_sdo: req.body.codSaldo },
  });
  if (!codSaldo) return res.status(400).json({ error: "Código no encontrado" });

  const [results] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.cod_sdo = ${
      codSaldo.cod_sdo
    } ORDER BY b.cod_sdo ASC LIMIT ${size} OFFSET ${page * size}`
  );

  const [totalResults] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.cod_sdo = ${codSaldo.cod_sdo} ORDER BY b.cod_sdo ASC`
  );

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getBalanceByNomProducto = async (req, res) => {
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

  const producto = await InItem.findOne({
    where: { descrip: req.body.nomProducto },
  });
  if (!producto)
    return res.status(400).json({ error: "Producto no encontrado" });

  const [results] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE c.descrip = "${
      producto.descrip
    }" ORDER BY b.cod_sdo ASC LIMIT ${size} OFFSET ${page * size}`
  );

  const [totalResults] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE c.descrip = "${producto.descrip}" ORDER BY b.cod_sdo ASC`
  );

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getBalanceByLinea = async (req, res) => {
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

  const linea = await InLinea.findOne({
    where: { des_linea: req.body.linea },
  });
  if (!linea) return res.status(400).json({ error: "Línea no encontrada" });

  const [results] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE d.des_linea = "${
      linea.des_linea
    }" ORDER BY b.cod_sdo ASC LIMIT ${size} OFFSET ${page * size}`
  );

  const [totalResults] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE d.des_linea = "${linea.des_linea}" ORDER BY b.cod_sdo ASC`
  );

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getBalanceBySaldo = async (req, res) => {
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

  const operator = req.body.operator;

  const [results] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.actual_sdo ${operator} 0 ORDER BY b.cod_sdo ASC LIMIT ${size} OFFSET ${
      page * size
    }`
  );

  const [totalResults] = await connection.query(
    `SELECT a.des_bod, b.cod_sdo, c.descrip, b.actual_sdo, d.des_linea FROM insaldo as b JOIN inbodega as a JOIN initem as c on c.cod_item = b.cod_sdo JOIN inlinea as d on c.itm_linea = d.cod_linea WHERE b.actual_sdo ${operator} 0 ORDER BY b.cod_sdo ASC`
  );

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getBalancebyFilters = async (req, res) => {
  const newQuery = req.body.query.split("LIMIT");
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

  const [results] = await connection.query(req.body.query);

  const [totalResults] = await connection.query(newQuery[0]);

  try {
    res.json({
      results: {
        content: results,
        totalData: totalResults.length,
        totalPages: Math.ceil(totalResults.length / Number.parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
