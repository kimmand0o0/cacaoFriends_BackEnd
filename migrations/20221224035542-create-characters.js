"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Characters", {
      characterId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      characterName: {
        type: Sequelize.DataTypes.STRING,
      },
      characterEnName: {
        type: Sequelize.DataTypes.STRING,
      },
      characterInfo: {
        type: Sequelize.DataTypes.STRING,
      },
      characterIcon: {
        type: Sequelize.DataTypes.STRING,
      },
      characterImage: {
        type: Sequelize.DataTypes.STRING,
      },
      characterDesc: {
        type: Sequelize.DataTypes.STRING,
      },
      characterDescripion: {
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Characters");
  },
};
