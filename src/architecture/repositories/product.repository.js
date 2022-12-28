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
        return this.productsModel.findAll({
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
    };

    getBestProducts = async () => {
        return this.productsModel.findAll({
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
    };

    getOrderLists = async () => {
        return this.productsModel.findAll({});
    };

    getProductsDetail = async (productId) => {
        return this.productsModel.findOne({
            raw: true,
            where: { productId },
        });
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
