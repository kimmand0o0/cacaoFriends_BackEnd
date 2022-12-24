"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Shorts, {
        as: "Shorts",
        foreignKey: "productId",
      });
      this.hasMany(models.Slides, {
        as: "Slides",
        foreignKey: "productId",
      });
      this.hasMany(models.OrderLists, {
        as: "OrderLists",
        foreignKey: "productId",
      });
      this.hasMany(models.Carts, {
        as: "Carts",
        foreignKey: "productId",
      });
      this.belongsTo(models.Characters, { foreignKey: "characterId" });
    }
  }
  Products.init(
    {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Characters",
          key: "characterId",
        },
        onDelete: "cascade",
      },
      productName: {
        type: DataTypes.STRING,
      },
      productPrice: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
      },
      imageUrl: {
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
      modelName: "Products",
    }
  );
  return Products;
};
