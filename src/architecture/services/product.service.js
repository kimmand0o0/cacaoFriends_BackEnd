const ProductRepository = require("../repositories/product.repository.js");
const { InvalidParamsError, ValidationError } = require("../../middlewares/exceptions/error.class.js")

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  createProducts = async ({ characterName, productName, productPrice, imageUrl, content }) => {
    const createProduct = await this.productRepository.createProducts({
      characterName,
      productName,
      productPrice,
      imageUrl,
      content
    });

    if (!createProduct) {
      throw new ValidationError();
    }
  };

  getProductsNew = async () => {
    const newList = await this.productRepository.getProductsAll();

    if (!newList) {
      throw new InvalidParamsError(
        '신상품 조회에 실패하였습니다.'
      );
    }

    return newList;
  };

  getProductsBest = async () => {
    const bestList = await this.productRepository.getProductsAll();

    if (!bestList) {
      throw new InvalidParamsError(
        '베스트 상품 조회에 실패하였습니다.'
      )
    }

    return bestList;
  };

  //캐릭터별 상품 조회
  getProductscharacterName = async (characterName) => {
    const allProduct =  await this.productRepository.getProductsAll();

    const productscharacterName = [];
    for (const product of allProduct) {
      if (product.characterName.includes(characterName) || product.characterName === '카카오 프렌즈') {
        productscharacterName.push(product);
      }
    }

    if (!productscharacterName) {
      throw new InvalidParamsError(
        '캐릭터 상품 조회에 실패하였습니다.'
      )
    }

    return productscharacterName;
  };

  getProductsDetail = async (productId) => {
    const productDetail = await this.productRepository.getProductsDetail(
      productId)
    
    if (!productDetail) {
      throw new InvalidParamsError(
        '상품 상세 조회에 실패하였습니다.'
      )
    }

    return productDetail;
  };

  // createProductsSlides = async ({ productId, title, content, slideImg }) => {
  //   await this.productRepository.createProductsSlides({
  //     productId,
  //     title,
  //     content,
  //     slideImg,
  //   });
  // };

  // createProductsShorts = async ({ content, videoUrl, productId }) => {
  //   await this.productRepository.createProductsShorts({
  //     content,
  //     videoUrl,
  //     productId
  //   });
  // };

  // getProductsSlides = async () => {
  //   const slidesList = this.productRepository.getProductsSlides();

  //   return slidesList;
  // };

  // //캐릭터별 상품 조회
  // getProductscharacterName = async (characterName) => {
  //   const productscharacterName =  await this.productRepository.getProductscharacterName(characterName);

  //   return productscharacterName;
  // }

  // getProductsPromotion = async () => {
  //   const productAll = await this.productRepository.getProductsAll();

  //   const promotionList = [];
  //   for (product of productAll) {
  //     if (
  //       product.productNamproduct.includes("크리스마스") ||
  //       product.productNamproduct.includes("눈사람")
  //     ) {
  //       promotionList.push(product);
  //     }
  //   }
  //   return promotionList;
  // };

  // getProductsShorts = async () => {
  //   const shortsList = await this.productRepository.getProductsShorts();

  //   return shortsList;
  // };
}

module.exports = ProductService;
