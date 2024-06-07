const sequelize = require('../config/config.js');
const { DataTypes } = require('sequelize');

const registrationModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    phoneNumber: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false, // Email is required
        validate: {
            isEmail: true, // Validation of email format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    dateOfBirth: {
        type: DataTypes.DATE, 
        allowNull: false, 
    },
    bloodGroup: {
        type: DataTypes.STRING,
    },
    donateBlood: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },  
}, {
    timestamps: false, 
});

module.exports = registrationModel;
