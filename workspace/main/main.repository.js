const { Slides, sequelize } = require("../../models");

class MainRepository {
  constructor(Products) {
    this.Products = Products;
  }

  getProductsSlides = async () => {
    const slidesList = await this.Slides.findAll({
      attributes: [
        "slideId",
        "productId",
        "title",
        "content",
        "image",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return slidesList;
  };

  getProductsNew = async () => {
    const newList = await this.Products.findAll({
      attributes: [
        "productId",
        "productName",
        "productPrice",
        "image",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return newList;
  };
}

module.exports = MainRepository;
