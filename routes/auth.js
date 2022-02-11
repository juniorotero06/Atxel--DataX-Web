const router = require("express").Router();
const Admin = require("../database-config").Admin;
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

//esquema de validaciones
const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(7).max(1024).required(),
});

const schemaRegister = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  lastname: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,1024}$/),
});

//Login
router.post("/login", async (req, res) => {
  // validaciones
  const { error } = schemaLogin.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Validando email
  const admin = await Admin.findOne({ where: { email: req.body.email } });
  if (!admin) return res.status(400).json({ error: "Usuario no encontrado" });

  //validando password
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword)
    return res.status(400).json({ error: "Contraseña no válida" });

  // create token
  const token = jwt.sign(
    {
      name: admin.name,
      lastname: admin.lastname,
      id: admin._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "2h" }
  );

  res.header("auth-token", token).json({
    error: null,
    data: { token },
  });
});

//Register
router.post("/register", async (req, res) => {
  // validate admin
  const { error } = schemaRegister.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //Validadr si el email existe
  const isEmailExist = await Admin.findOne({ where: { email: req.body.email } });
  if (isEmailExist) {
    return res.status(400).json({ error: "Email ya registrado" });
  }

  //Hasshear Contraseña
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  //Creando el nuevo usario
  const admin = Admin.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password,
  });
  try {
    //Insertar Dato en la tabla admin
    const savedAdmin = await admin.save();
    res.json({
      error: null,
      data: savedAdmin,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;

