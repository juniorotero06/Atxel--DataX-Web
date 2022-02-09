module.exports = (sequelize, type) => {
    return sequelize.define('License', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        companyName: {
            type: type.STRING,
            validate: {
                notEmpty: true,
            }
        },
        address: {
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        phone: {
            type: type.INTEGER,
            validate: {
                isNumeric: true,
                min: 5,
                max: 15
            }
        },
        activo: {
            type: type.BOOLEAN,
            allowNull: false
        },
        server:{
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        bdUser: {
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        bdPass: {
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        },
        bdName: {
            type: type.STRING,
            validate: {
                isAlphanumeric: true,
                notEmpty: true,
            }
        }
    });
}