const { DataTypes } = require('sequelize')
const sequelize=require('../config/config')

  const createRequestModel = sequelize.define('rating', {
    textField: {
        type: DataTypes.TEXT, 
        allowNull: false, 
      },
  }, {
    timestamps: false, 
  });

module.exports=createRequestModel
