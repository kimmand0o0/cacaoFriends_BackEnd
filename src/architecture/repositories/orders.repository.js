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
        });
    };

    addOrderLists = async (carts, userId) => {
        await this.ordersModel.create({
            userId,
            products: carts.products,
        });
    };

    findCarts = async (userId) => {
        return this.ordersModel.findOne({
            raw: true,
            where: {
                [Op.or]: [{ userId }],
            },
        });
    };

    addCarts = async (carts) => {
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
        productPrice,
        imageUrl
    ) => {
        await this.ordersModel.create({
            userId,
            products: [
                {
                    productId,
                    amount,
                    productName,
                    quantityPrice: productPrice,
                    imageUrl,
                },
            ],
        });
    };

    deleteCarts = async (userId) => {
        await this.ordersModel.destroy({
            where: { userId },
        });
    };

    addFirstCarts = async (
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
