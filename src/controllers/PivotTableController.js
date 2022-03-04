const UserRolLicense =
  require("../../database/config/database-config").UserRolLicense;
const { Op } = require("sequelize");

exports.getPivotTable = async (req, res) => {
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

  const pivotWithCount = await UserRolLicense.findAndCountAll({
    limit: size,
    offset: page * size,
  });
  res.send({
    content: pivotWithCount.rows,
    totalPages: Math.ceil(pivotWithCount.count / Number.parseInt(size)),
  });
};

exports.createPivot = async (req, res) => {
  const UserId = await Number.parseInt(req.body.UserId);
  const RolId = await Number.parseInt(req.body.RolId);
  const LicenseId = await Number.parseInt(req.body.LicenseId);

  const pivotTable = UserRolLicense.create({
    UserId,
    RolId,
    LicenseId,
  });
  try {
    const savedPivot = await pivotTable.save();
    res.json({
      data: savedPivot,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getPivotById = async (req, res) => {
  let pivotId = req.params.id;
  UserRolLicense.findOne({ where: { id: pivotId } }).then((pivot) => {
    res.json(pivot);
  });
};

exports.updatePivot = async (req, res) => {
  let pivotId = req.params.id;
  let updateRegister = req.body;

  UserRolLicense.findOne({ where: { id: pivotId } }).then((pivot) => {
    pivot.update(updateRegister).then((updatePivot) => {
      res.json(updatePivot);
    });
  });
};

exports.deletePivot = async (req, res) => {
  let pivotId = req.params.id;

  UserRolLicense.destroy({ where: { id: pivotId } }).then(() => {
    res.send("Tabla pivote eliminada");
  });
};

exports.searchPivot = async (req, res) => {
  let { search } = req.query;

  UserRolLicense.findAll({
    where: {
      [Op.or]: {
        id: { [Op.like]: search },
      },
    },
  }).then((pivot) => {
    res.send({ content: pivot });
  });
};
