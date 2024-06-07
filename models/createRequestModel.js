const { DataTypes } = require('sequelize')
const sequelize=require('../config/config')

  const createRequestModel = sequelize.define('createRequest', {
    bloodForMyself: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiredUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requiredDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hospital: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false, 
  });

module.exports=createRequestModel
