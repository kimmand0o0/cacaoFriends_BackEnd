"use strict";
const { Model } = require("sequelize");
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
        as: "Products",
        foreignKey: "characterId",
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
      },
      characterEnName: {
        type: DataTypes.STRING,
      },
      characterInfo: {
        type: DataTypes.STRING,
      },
      characterIcon: {
        type: DataTypes.STRING,
      },
      characterImage: {
        type: DataTypes.STRING,
      },
      characterDesc: {
        type: DataTypes.STRING,
      },
      characterDescripion: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Characters",
    }
  );
  return Characters;
};
