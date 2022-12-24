"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, { foreignKey: "productId" });
    }
  }
  Shots.init(
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
          model: "Products",
          key: "productId",
        },
        onDelete: "cascade",
      },
      content: {
        type: DataTypes.STRING,
      },
      videoUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Shots",
    }
  );
  return Shots;
};
