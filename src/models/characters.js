'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Characters extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Products, {
                as: 'Products',
                foreignKey: 'characterId',
            });
        }
    }
    Characters.init(
        {
            characterId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            characterName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterEnName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterInfo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterIcon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterImage: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterDesc: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            characterDescription: {
                type: DataTypes.STRING(1000),
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
            modelName: 'Characters',
        }
    );
    return Characters;
};
