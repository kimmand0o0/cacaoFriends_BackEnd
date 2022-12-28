const { Op } = require('sequelize');

class OrdersRepository {
    constructor(OrdersModel) {
        this.ordersModel = OrdersModel;
    }

    findAllOrderLists = async (userId) => {
        return this.ordersModel.findAll({
            raw: true,
            where: {
                [Op.or]: [{ userId }],
            },
            order: [['createdAt', 'DESC']],
        });
    };

    addOrderLists = async (carts, userId) => {
        await this.ordersModel.create({
            userId,
            products: carts.products,
        });
    };

    findCart = async (userId) => {
        return this.ordersModel.findOne({
            raw: true,
            where: {
                [Op.or]: [{ userId }],
            },
        });
    };

    addCart = async (carts) => {
        await this.ordersModel.update(
            { products: carts.products },
            { where: { cartId: carts.cartId } }
        );
    };

    directOrderLists = async (
        amount,
        userId,
        productId,
        productName,
        quantityPrice,
        imageUrl
    ) => {
        await this.ordersModel.create({
            userId,
            products: [
                {
                    productId,
                    amount,
                    productName,
                    quantityPrice,
                    imageUrl,
                },
            ],
        });
    };

    deleteCart = async (userId) => {
        await this.ordersModel.destroy({
            where: { userId },
        });
    };

    addFirstCart = async (
        productId,
        amount,
        userId,
        productName,
        quantityPrice,
        imageUrl
    ) => {
        await this.ordersModel.create({
            userId,
            products: [
                {
                    productId,
                    amount,
                    productName,
                    quantityPrice,
                    imageUrl,
                },
            ],
        });
    };
}

module.exports = OrdersRepository;
