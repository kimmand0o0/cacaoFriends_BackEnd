const OrderListsRepository = require('../repositories/orders.repository');
const productsRepository = require('../repositories/product.repository');
const { OrderLists, Carts, Products } = require('../../models');

class OrdersService {
    orderListsRepository = new OrderListsRepository(OrderLists);
    cartsRepository = new OrderListsRepository(Carts);
    productsRepository = new productsRepository(Products);

    findAllOrderLists = async (userId) => {
        return this.orderListsRepository.findAllOrderLists(userId);
    };

    findCarts = async (userId) => {
        return this.cartsRepository.findCarts(userId);
    };

    addOrderLists = async (userId) => {
        const carts = await this.cartsRepository.findCarts(userId);
        if (!carts) {
            throw new Error('장바구니가 비었습니다.');
        }

        let list = carts.products;
        for (let i in list) {
            let amount = list[i].amount;
            let productId = list[i].productId;
            await this.productsRepository.addAmount(amount, productId);
        }
        await this.cartsRepository.deleteCarts(userId);
        await this.orderListsRepository.addOrderLists(carts, userId);
    };

    addCarts = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCarts(userId);

        if (carts) {
            let itemIndex = carts.products.findIndex(
                (p) => p.productId === productId
            );
            if (itemIndex > -1) {
                let product = carts.products[itemIndex];
                product.amount += amount;
                carts.products[itemIndex] = product;
            } else {
                carts.products.push({
                    amount,
                    productId,
                });
            }
            await this.cartsRepository.addCarts(carts);
        } else {
            await this.cartsRepository.addFirstCarts(productId, amount, userId);
        }
    };

    updateProductAmountInCarts = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCarts(userId);

        if (carts) {
            let itemIndex = carts.products.findIndex(
                (p) => p.productId === productId
            );
            if (itemIndex > -1) {
                let product = carts.products[itemIndex];
                product.amount = amount;
                carts.products[itemIndex] = product;
                await this.cartsRepository.addCarts(carts);
            } else {
                throw new Error('장바구니에 등록되지않은 상품입니다.');
            }
        } else {
            throw new Error('빈 장바구니입니다.');
        }
    };

    deleteProductInCarts = async (productId, userId) => {
        let carts = await this.cartsRepository.findCarts(userId);

        if (carts) {
            let itemIndex = carts.products.findIndex(
                (p) => p.productId === productId
            );
            if (itemIndex > -1) {
                let product = carts.products[itemIndex];
                let products = carts.products.filter((x) => x !== product);
                carts.products = products;

                await this.cartsRepository.addCarts(carts);
            } else {
                throw new Error('장바구니에 등록되지않은 상품입니다.');
            }
        } else {
            throw new Error('빈 장바구니입니다.');
        }
    };
}

module.exports = OrdersService;
