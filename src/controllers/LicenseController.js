const License = require("../../database/config/database-config").License;
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');

const schemaLicense = Joi.object({
  companyName: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(5).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  phone: Joi.string().min(5).max(255).required(),
  activo: Joi.boolean().default(1),
  host: Joi.string().min(5).max(255).required(),
  bdUser: Joi.string().min(5).max(255).required(),
  bdPass: Joi.string().min(5).max(255).required(),
  bdName: Joi.string().min(5).max(255).required()
});

exports.getLicenses = async (req,  res) => {
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

    const licensesWithCount = await License.findAndCountAll({
        limit: size,
        offset: page * size,
      });
      res.send({
        content: licensesWithCount.rows,
        totalPages: Math.ceil(licensesWithCount.count / Number.parseInt(size)),
      });
}

exports.createLicense = async ( req, res ) => {
  const { error } = schemaLicense.validate(req.body);
  if (error) {
    return res.status(400).json( { error: error.details[0].message } );
  }

  const isEmailExist = await License.findOne({
    where: { email: req.body.email }
  });
  if (isEmailExist) {
    return res.status(400).json( { error: "Licensia ya registrado" } );
  }

  const salt = await bcrypt.genSalt(10);
  const bdPass = await bcrypt.hash(req.body.bdPass, salt);

  const license = License.create({
    companyName: req.body.companyName,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    host: req.body.host,
    bdUser: req.body.bdUser,
    bdName: req.body.bdName,
    activo: 1,
    bdPass
  });
  try {
    const savedLicense = await license.save();
    res.json({
      data: savedLicense
    });
  } catch (error) {
    res.status(500).json({error});
  }
}

exports.getLicenseById = async ( req, res ) => {
  let licenseId = req.params.id;
  License.findOne({ where: { id: licenseId } }).then((license) =>{
    res.json(license);
  });
}

exports.updateLicense = async ( req, res ) => {
  let licenseId = req.params.id;

  const { error } = schemaLicense.validate(req.body);
  if (error) {
    return res.status(400).json( { error: error.details[0].message } );
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  let updateRegister = {
    ...req.body,
    password
  };

  License.findOne( { where: { id: licenseId } }).then((license) =>{
    license.update(updateRegister).then((updateLicense) => {
      res.json(updateLicense);
    });
  });
}

exports.deleteLicense = async ( req, res ) => {
  let licenseId = req.params.id;

  License.destroy({ where: { id: licenseId } }).then(()=>{
    res.send('Licensia eliminada');
  });
}