'use strict';
module.exports = function(sequelize, DataTypes) {
  var Park = sequelize.define('Park', {
    park_id: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    park_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    latitude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    directions_info: DataTypes.TEXT,
    url: DataTypes.STRING,
    directions_url: DataTypes.STRING,
    weather_info: DataTypes.TEXT,
  },{
    timestamps: false
  },
   {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Park;
};