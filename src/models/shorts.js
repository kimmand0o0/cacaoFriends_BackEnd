'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Shorts extends Model {
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
    Shorts.init(
        {
            shotId: {
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
            content: {
                type: DataTypes.STRING(1000),
                allowNull: false,
            },
            videoUrl: {
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
            modelName: 'Shorts',
        }
    );
    return Shorts;
};
