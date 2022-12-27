const { Products, OrderLists, sequelize } = require('../../models');

class ProductRepository {
    constructor(ProductsModel) {
        this.productsModel = ProductsModel;
    }

    createProducts = async ({
        characterName,
        productName,
        productPrice,
        imageUrl,
        content,
    }) => {
        await this.productsModel.create({
            characterName,
            productName,
            productPrice,
            imageUrl,
            content,
        });
    };

    getProductsAll = async () => {
        const newList = await this.productsModel.findAll({
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
        const bestLists = await this.productsModel.findAll({
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
        const orderLists = await this.productsModel.findAll({});

        return orderLists;
    };

    getProductsDetail = async (productId) => {
        const productDetail = await this.productsModel.findOne({
            raw: true,
            where: { productId },
        });

        return productDetail;
    };

    addAmount = async (amount, productId) => {
        await this.productsModel.increment(
            { amount },
            {
                where: { productId },
            }
        );
    };
}

module.exports = ProductRepository;
