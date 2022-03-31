const User = require("../../database/config/database-config").User;
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

//esquema de validaciones
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

exports.login = async (req, res) => {
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({
    where: { email: req.body.email, activo: 1 },
  });
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Contraseña no válida" });

  const token = jwt.sign(
    {
      name: user.name,
      lastname: user.lastname,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  try {
    res.header("auth-token", token).json({
      data: { token },
      name: user.name,
      lastname: user.lastname,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
