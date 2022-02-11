module.exports = (sequelize, type) => {
    return sequelize.define('User_Rol_License', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        }
    });
}