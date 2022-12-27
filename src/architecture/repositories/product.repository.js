const { Products, OrderLists, sequelize } = require('../../models');

class ProductRepository {
    constructor() {}

    createProducts = async ({
        characterName,
        productName,
        productPrice,
        imageUrl,
        content,
    }) => {
        await Products.create({
            characterName,
            productName,
            productPrice,
            imageUrl,
            content,
        });
    };

    getProductsAll = async () => {
        const newList = await Products.findAll({
            raw: true,
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

    getBestProducts = async () => {
        const bestLists = await Products.findAll({
            raw: true,
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
            order: [
                ['amount', 'DESC'],
                ['productId', 'ASC'],
            ],
        });
        return bestLists;
    };

    getOrderLists = async () => {
        const orderLists = await OrderLists.findAll({});

        return orderLists;
    };

    getProductsDetail = async (productId) => {
        const productDetail = await Products.findOne({
            where: { productId },
        });

        return productDetail;
    };
}

module.exports = ProductRepository;
