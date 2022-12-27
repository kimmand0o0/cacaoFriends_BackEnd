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
    const orderlists =  await this.productRepository.getOrderLists();
    const productsLists = await this.productRepository.getProductsAll();

    let allOrderLists = [];
    for (const orderlist of orderlists) {
      for (const product of orderlist.products) {
        allOrderLists.push(product);
      }
    }

    let bestLists = [];
    let amount =0;
    for (let productsList of productsLists) {
      for (let i=0; i<allOrderLists.length; i++) {
          if (productsList.productId === allOrderLists[i].productId) {
            amount += allOrderLists[i].amount
          }
      }
      bestLists.push({productId : productsList.productId, amount})
      amount = 0;
    }
    bestLists.sort((a,b) => {
      if (a.amount > b.amount) {
      return -1
      }
    })
    
    let bestAllProducts = [];
    for (let bestList of bestLists) {
      let bestProducts = await this.productRepository.getBestProducts({
        productId : bestList.productId
      })
      bestAllProducts.push(bestProducts)
    }
    
    return bestAllProducts;
  };

  //캐릭터별 상품 조회
  getProductsCharacterName = async (characterName) => {
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
