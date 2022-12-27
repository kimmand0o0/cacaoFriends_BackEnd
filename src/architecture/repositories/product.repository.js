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

    getBestProducts = async ({ productId }) => {
        const newList = await Products.findAll({
            raw: true,
            where: { productId },
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
