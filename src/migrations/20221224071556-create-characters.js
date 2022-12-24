'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Characters', {
            characterId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            characterName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterEnName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterIntro: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterIcon: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterImage: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterDesc: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            characterDescription: {
                type: Sequelize.STRING(1000),
                allowNull: false,
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
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Characters');
    },
};
