'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Slides extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Products, { foreignKey: 'productId' });
        }
    }
    Slides.init(
        {
            slideId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'productId',
                },
                onDelete: 'cascade',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            slideImg: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Slides',
        }
    );
    return Slides;
};
