const User = require("../../database/config/database-config").User;
const License = require("../../database/config/database-config").License;
const UserRolLicense =
  require("../../database/config/database-config").UserRolLicense;
const Joi = require("@hapi/joi");

const schemaUserRegister = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  licenseId: Joi.string().max(10),
  rol: Joi.string().required(),
});

exports.adminRegisterToUser = async (req, res) => {
  const { error } = schemaUserRegister.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (user) return res.status(400).json({ error: "Usuario ya registrado" });
};
