const Admin = require("../../database/config/database-config").Admin;

exports.getAdminById = async (req, res) => {
  let adminId = req.params.id;
  Admin.findOne({ where: { id: adminId } }).then((admin) => {
    res.json(admin);
  });
};
