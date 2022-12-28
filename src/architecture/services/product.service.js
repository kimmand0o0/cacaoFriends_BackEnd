const ProductRepository = require('../repositories/product.repository.js');
const { Products } = require('../../models');
const {
    InvalidParamsError,
    ValidationError,
} = require('../../middlewares/exceptions/error.class.js');

class ProductService {
    productsRepository = new ProductRepository(Products);

    createProducts = async ({
        characterName,
        productName,
        productPrice,
        imageUrl,
        content,
    }) => {
        const createProduct = await this.productsRepository.createProducts({
            characterName,
            productName,
            productPrice,
            imageUrl,
            content,
        });
        return createProduct;
    };

    getProductsNew = async () => {
        const newList = await this.productsRepository.getProductsAll();

        if (!newList) {
            throw new InvalidParamsError('신상품 조회에 실패하였습니다.');
        }

        return newList;
    };

    getProductsBest = async () => {
        const bestLists = await this.productsRepository.getBestProducts();

        return bestLists;
    };

    //캐릭터별 상품 조회
    getProductsCharacterName = async (characterName) => {
        const allProduct = await this.productsRepository.getProductsAll();

        const productsCharacterName = [];
        for (const product of allProduct) {
            if (
                product.characterName.includes(characterName) ||
                product.characterName === 'KAKAOFRIENDS'
            ) {
                productsCharacterName.push(product);
            }
        }

        if (!productsCharacterName) {
            throw new InvalidParamsError('캐릭터 상품 조회에 실패하였습니다.');
        }

        return productsCharacterName;
    };

    getProductsDetail = async (productId) => {
        const productDetail = await this.productsRepository.getProductsDetail(
            productId
        );

        if (!productDetail) {
            throw new InvalidParamsError('상품 상세 조회에 실패하였습니다.');
        }

        return productDetail;
    };
}

module.exports = ProductService;
