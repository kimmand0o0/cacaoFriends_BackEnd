const { Op } = require('sequelize');
const { Products, Sequelize } = require('../../models');

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
        console.log(userId, 1);
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

    deleteCarts = async (userId) => {
        console.log(userId, 1);
        await this.ordersModel.destroy({
            where: { userId },
        });
    };

    addFirstCarts = async (productId, amount, userId) => {
        await this.ordersModel.create({
            userId,
            products: [
                {
                    productId,
                    amount,
                },
            ],
        });
    };
}

module.exports = OrdersRepository;