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
