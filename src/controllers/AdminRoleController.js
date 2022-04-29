const User = require("../../database/config/database-config").User;
const License = require("../../database/config/database-config").License;
const Rol = require("../../database/config/database-config").Rol;
const UserRolLicense =
  require("../../database/config/database-config").UserRolLicense;
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");

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
  // const { error } = schemaUserRegister.validate(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });

  const isEmailExist = await User.findOne({
    where: { email: req.body.email },
  });
  if (isEmailExist)
    return res.status(400).json({ error: "Usuario ya registrado" });

  const license = await License.findOne({
    where: { licenseId: req.body.licenseId },
  });
  if (!license)
    return res.status(400).json({ error: "Licencia no registrada" });

  const rol = await Rol.findOne({ where: { rolName: req.body.rol } });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
    activo: 1,
    password,
  });

  await UserRolLicense.create({
    UserId: user.id,
    RolId: rol.id,
    LicenseId: license.id,
  });

  try {
    const savedUser = await user.save();
    const savedPivot = await UserRolLicense.save();
    res.json({
      data: { savedUser, savedPivot },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.changePasswordAdmin = async (req, res) => {
  let userEmail = req.body.email;
  let oldPassword = req.body.password;
  let newPassword = req.body.newPassword;

  const user = await User.findOne({ where: { email: userEmail } });
  if (!user) return res.status(400).json({ error: "Usuario erroneo" });

  const validPassword = await bcrypt.compare(oldPassword, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Contraseña Erronea" });

  const comparePasswords = await bcrypt.compare(newPassword, user.password);
  if (comparePasswords)
    return res
      .status(400)
      .json({ error: "La nueva contraseña no puede ser igual a la anterior" });

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);

  try {
    await user.update({ password: password }).then(() => {
      res.json({ data: "Se ha actualizado la contraseña" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.changeRoleToUser = async (req, res) => {
  let userEmail = req.body.email;
  let newRol = req.body.rol;

  const user = await User.findOne({ where: { email: userEmail } });
  if (!user) return res.status(400).json({ error: "Usuario no existe" });

  const pivot = await UserRolLicense.findOne({ where: { UserId: user.id } });

  const rol = await Rol.findOne({ where: { rolName: newRol } });

  try {
    await pivot.update({ RolId: rol.id }).then(() => {
      res.json({ data: "Se ha cambiado el Rol al usuario" });
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
