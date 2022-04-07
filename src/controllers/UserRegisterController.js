const User = require("../../database/config/database-config").User;
const License = require("../../database/config/database-config").License;
const Joi = require("@hapi/joi");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.API_KEY_SENDGRID);

//esquema de validaciones
const schemaUserRegister = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  licenseId: Joi.string().max(10),
  rol: Joi.string().required(),
});

const schemaLicenseRegister = Joi.object({
  companyName: Joi.string().required(),
  licenseId: Joi.string().max(10).required(),
  address: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  host: Joi.string().required(),
  bdUser: Joi.string().required(),
  bdName: Joi.string().required(),
  bdPass: Joi.string().required(),
  registerName: Joi.string().required(),
  registerLastname: Joi.string().required(),
  registerPhone: Joi.string().required(),
  registerEmail: Joi.string().required(),
  registerPassword: Joi.string().required(),
  rol: Joi.string().required(),
});

exports.regiterEmail = async (req, res) => {
  const { error } = schemaUserRegister.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({
    where: { email: req.body.email },
  });
  if (user) return res.status(400).json({ error: "Usuario ya registrado" });

  msg = {
    to: "edgar.otero@atxel.com",
    from: "edgar.otero@atxel.com",
    subject: "Registro de usuario Atxel Movil",
    text: `Solicitud de Registro de usuario a Base de datos Atxel
      Nombre: ${req.body.name}
      Apellido: ${req.body.lastname}
      Teléfono: ${req.body.phone}
      Email: ${req.body.email}
      Constraseña: ${req.body.password}
      Código de la licencia: ${req.body.licenseId},
      Rol: ${req.body.rol}
      `,
  };

  try {
    await sgMail.send(msg);
    res.json({
      data: "Email enviado satisfactoriamente",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.licenseEmail = async (req, res) => {
  const { error } = schemaLicenseRegister.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({
    where: { email: req.body.registerEmail },
  });
  if (user) return res.status(400).json({ error: "Usuario ya registrado" });

  const license = await License.findOne({
    where: { email: req.body.email },
  });
  if (license) return res.status(400).json({ error: "Licencia ya registrada" });

  msg = {
    to: "edgar.otero@atxel.com",
    from: "edgar.otero@atxel.com",
    subject: "Registro de usuario con licencia Atxel Movil",
    text: `Solicitud de Registro de usuario y licencia a Base de datos Atxel

        --Datos del usuaurio--
      Nombre del usuario: ${req.body.registerName}
      Apellido del usuario: ${req.body.registerLastname}
      Teléfono del usuario: ${req.body.registerPhone}
      Email del usuario: ${req.body.registerEmail}
      Constraseña del usuario: ${req.body.registerPassword}
      Rol: ${req.body.rol}

      --Datos de la Compañia--

      Nombre de la compañia: ${req.body.companyName}
      Código de la licencia: ${req.body.licenseId}
      Dirección de la compañia: ${req.body.address}
      Email de la compañia: ${req.body.email}
      Teléfono de la compañia: ${req.body.phone}
      Host de la Base de datos: ${req.body.host}
      Usuario de la Base de datos: ${req.body.bdUser}
      Nombre de la Base de datos: ${req.body.bdName}
      Contraseña de la Base de datos: ${req.body.bdPass}
      `,
  };

  try {
    await sgMail.send(msg);
    res.json({
      data: "Email enviado satisfactoriamente",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
