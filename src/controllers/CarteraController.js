const Saldo_CXC = require("../../database/config/datax-store-config").Saldo_CXC;
const Saldo_CXP = require("../../database/config/datax-store-config").Saldo_CXP;
const connection =
  require("../../database/config/datax-store-config").connection;

exports.getSaldos_CXC_CXP = async (req, res) => {
  const [results] = await connection.query(req.body.query);
  try {
    res.json({
      results: {
        content: results,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getCarteraDetails = async (req, res) => {
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
