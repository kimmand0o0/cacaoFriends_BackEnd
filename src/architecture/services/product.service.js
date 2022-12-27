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
    return createProduct;
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
    const bestList = await this.productRepository.getProductsHot();

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
      if (product.characterName.includes(characterName)|| characterName.includes(product.characterName) || product.characterName === 'KAKAOFRIENDS') {
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

}

module.exports = ProductService;
