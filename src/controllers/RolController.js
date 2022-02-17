const Rol = require('../../database/config/database-config').Rol;

exports.getRols = async ( req, res ) => {
    const rols = await Rol.findAll();
    res.json(rols);
}