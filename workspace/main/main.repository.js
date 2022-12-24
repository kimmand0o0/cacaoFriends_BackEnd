const { Slides, Products } = require("../../models");

class MainRepository {
  constructor() {}

  getProductsSlides = async () => {
    const slidesList = await Slides.findAll({
      attributes: [
        "slideId",
        "productId",
        "title",
        "content",
        "slideImg",
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
