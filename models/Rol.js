module.exports = (sequelize, type) => {
    return sequelize.define('Rol', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        rolName: {
            type: type.STRING,
            validate: {
                notEmpty: true,
            }
        }
    });
}