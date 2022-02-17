const UserRolLicense = require("../../database/config/database-config").UserRolLicense;
const Joi = require("@hapi/joi");

const schemaPivot = Joi.object({
  UserId: Joi.number().required(),
  RolId: Joi.number().required(),
  LicenseId: Joi.number().required()
});

exports.getPivotTable = async ( req, res) => {
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
}

exports.createPivot = async ( req, res ) => {
  const { error } = schemaPivot.validate(req.body);
  if (error) {
    return res.status(400).json( { error: error.details[0].message } );
  }

  const pivotTable = UserRolLicense.create({
    UserId: req.body.UserId,
    RolId: req.body.RolId,
    LicenseId: req.body.LicenseId
  });
  try {
    const savedPivot = await pivotTable.save();
    res.json({
      data: savedPivot
    });
  } catch (error) {
    res.status(500).json({error});
  }
};

exports.getPivotById = async ( req, res ) => {

}

exports.updatePivot = async ( req, res ) => {

}

exports.deletePivot = async ( req, res ) => {

}