const { Products, OrderLists, sequelize } = require("../../models");

class ProductRepository {
  constructor() {}

  createProducts = async ({ characterName, productName, productPrice, imageUrl, content }) => {
    await Products.create({
      characterName,
      productName,
      productPrice,
      imageUrl,
      content
    });
  };

  getProductsAll = async () => {
    const newList = await Products.findAll({
      raw: true,
      attributes: [
        "productId",
        "productName",
        "productPrice",
        "content",
        "characterName",
        "imageUrl",
        "createdAt",
        "updatedAt",
      ],
      order: [["createdAt", "DESC"]],
    });
    return newList;
  };

  getProductsHot = async () => {
    const newList = await Products.findAll({
      raw: true,
      include : [{
        model : OrderLists,
        attributes : ['products'],
        as : 'OrderLists'
      }],
      attributes: [
        "productId",
        "productName",
        "productPrice",
        "content",
        "characterName",
        "imageUrl",
        "createdAt",
        "updatedAt",
        [sequelize.col("OrderLists.products"), "products"],
      ],
      order: [["createdAt", "DESC"]],
    });
    return newList;
  };

  getProductsDetail = async (productId) => {
    const productDetail = await Products.findOne({
      where: { productId },
    });

    return productDetail;
  };

}

module.exports = ProductRepository;
