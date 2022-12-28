const ProductRepository = require('../repositories/product.repository.js');
const { Products } = require('../../models');
const {
    InvalidParamsError,
} = require('../../middlewares/exceptions/error.class.js');
const { Op } = require('sequelize');

class ProductService {
    productsRepository = new ProductRepository(Products);

    createProducts = async ({
        characterName,
        productName,
        productPrice,
        imageUrl,
        content,
    }) => {
        this.productsRepository.createProducts({
            characterName,
            productName,
            productPrice,
            imageUrl,
            content,
        });
    };

    getProductsNew = async () => {
        const newList = await this.productsRepository.getProductsAll({
            limit: 8,
            attributes: [
                'productId',
                'productName',
                'productPrice',
                'content',
                'characterName',
                'imageUrl',
                'createdAt',
                'updatedAt',
            ],
            order: [['createdAt', 'DESC']],
        });
        return newList;
    };

    getProductsBest = async () => {
        const bestLists = await this.productsRepository.getProductsAll({
            attributes: [
                'productId',
                'productName',
                'productPrice',
                'content',
                'characterName',
                'imageUrl',
                'amount',
                'createdAt',
                'updatedAt',
            ],
            limit: 50,
            order: [
                ['amount', 'DESC'],
                ['productId', 'ASC'],
            ],
        });
        return bestLists;
    };

    //캐릭터별 상품 조회
    getProductsCharacterName = async (characterName) => {
        const characterProducts = await this.productsRepository.getProductsAll({
            attributes: [
                'productId',
                'productName',
                'productPrice',
                'content',
                'characterName',
                'imageUrl',
                'createdAt',
                'updatedAt',
            ],
            where: {
                [Op.or]: [
                    { characterName: { [Op.like]: '%' + characterName + '%' } },
                    { characterName: 'KAKAOFRIENDS' },
                ],
            },
            order: [['createdAt', 'DESC']],
        });
        return characterProducts;
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
