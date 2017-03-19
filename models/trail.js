'use strict';
module.exports = function(sequelize, DataTypes) {
    var Trail = sequelize.define('Trail', {
        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trail_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        park_name: DataTypes.STRING,
        distance: DataTypes.FLOAT,
        url: DataTypes.STRING
    }, {
        timestamps: false
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Trail;
};