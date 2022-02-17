const UserRolLicense = require("../../database/config/database-config").UserRolLicense;

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