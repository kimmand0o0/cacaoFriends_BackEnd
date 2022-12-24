'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Slides', {
            slideId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            productId: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'productId',
                },
                onDelete: 'cascade',
            },
            title: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.DataTypes.STRING(1000),
                allowNull: false,
            },
            slideImg: {
                type: Sequelize.DataTypes.STRING,
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
        await queryInterface.dropTable('Slides');
    },
};
