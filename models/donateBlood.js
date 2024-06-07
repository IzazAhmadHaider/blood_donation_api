const { DataTypes } = require('sequelize')
const sequelize=require('../config/config')


const donateBloodModel=sequelize.define('donateBlood',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bloodType: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
},
{ timestamps: false }
);

module.exports=donateBloodModel