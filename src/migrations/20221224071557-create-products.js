'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
            model: 'Characters',
            key: 'characterId',
        },
        onDelete: 'CASCADE',
        allowNull: false,
    },
      productName: {
        type: Sequelize.STRING,
        allowNull : false
      },
      productPrice: {
        type: Sequelize.STRING,
        allowNull : false
      },
      content : {
        type : Sequelize.STRING(1000),
        allowNull : false
      },
      imageUrl : {
        type: Sequelize.STRING,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};