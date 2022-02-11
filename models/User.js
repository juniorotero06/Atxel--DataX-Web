module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: type.STRING,
            validate: {
                notEmpty: true,
            }
        },
        lastname: {
            type: type.STRING,
            validate: {
                notEmpty: true, 
            }
        },
        password: {
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        activo: {
            type: type.BOOLEAN,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        }
    })
}