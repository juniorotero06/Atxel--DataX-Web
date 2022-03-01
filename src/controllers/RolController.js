const Rol = require("../../database/config/database-config").Rol;

exports.getRols = async (req, res) => {
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

  const RolsWithCount = await Rol.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.send({
    content: RolsWithCount.rows,
    totalPages: Math.ceil(RolsWithCount.count / Number.parseInt(size)),
  });
};
