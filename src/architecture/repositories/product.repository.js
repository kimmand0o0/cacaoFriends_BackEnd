const { Slides, Products, Shorts, OrderLists, sequelize } = require("../../models");

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
        // [sequelize.col("OrderLists.amount"), "amount"],
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

  // createProductsSlides = async ({ productId, title, content, slideImg }) => {
  //   await Slides.create({
  //     productId,
  //     title,
  //     content,
  //     slideImg,
  //   });
  // };

  // createProductsShorts = async ({ content, videoUrl, productId }) => {
  //   await Shorts.create({
  //     content,
  //     videoUrl,
  //     productId
  //   });
  // };

  // getProductsSlides = async () => {
  //   const slidesList = await Slides.findAll({
  //     raw: true,
  //     attributes: [
  //       "slideId",
  //       "productId",
  //       "title",
  //       "content",
  //       "slideImg",
  //       "createdAt",
  //       "updatedAt",
  //     ],
  //     order: [["createdAt", "DESC"]],
  //   });
  //   return slidesList;
  // };

  // getProductscharacterName = async (characterName) => {
  //   const productscharacterName = await Products.findAll({
  //     where : { characterName },
  //     raw: true,
  //     attributes: [
  //       "productId",
  //       "productName",
  //       "productPrice",
  //       "content",
  //       "imageUrl",
  //       "characterName",
  //       "createdAt",
  //       "updatedAt",
  //       // [sequelize.col("OrderLists.amount"), "amount"],
  //     ],
  //     order: [["createdAt", "DESC"]],
  //   });
  //   return productscharacterName;
  // }

  // getProductsShorts = async () => {
  //   const shortsList = await Shorts.findAll({
  //     raw: true,
  //     attributes: [
  //       "shortId", 
  //       "content", 
  //       "videoUrl", 
  //       "productId",
  //       "createdAt",
  //       "updatedAt",
  //       [sequelize.col("Product.productName"), "productName"],
  //       [sequelize.col("Product.productPrice"), "productPrice"],
  //     ],
  //     include: [
  //       {
  //         model: Products,
  //         attributes: [],
  //       },
  //     ],
  //     order: [["createdAt", "DESC"]],
  //   });
  //   return shortsList;
  // };

}

module.exports = ProductRepository;
