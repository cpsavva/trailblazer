'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Parks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      park_id: {
        type: Sequelize.STRING
      },
      park_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      latitude: {
        type: Sequelize.FLOAT
      },
      longitude: {
        type: Sequelize.FLOAT
      },
      state: {
        type: Sequelize.STRING
      },
      directions_info: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      directions_url: {
        type: Sequelize.STRING
      },
      weather_info: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Parks');
  }
};