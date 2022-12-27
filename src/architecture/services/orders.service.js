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
        const carts = await this.cartsRepository.findCarts(userId);
        if (!carts) {
            return {};
        }
        return carts;
    };

    addOrderLists = async (userId) => {
        const carts = await this.cartsRepository.findCarts(userId);
        if (!carts) {
            throw new Error('장바구니가 비었습니다.');
        }

        const list = carts.products;
        for (const i in list) {
            const amount = list[i].amount;
            const productId = list[i].productId;
            await this.productsRepository.addAmount(amount, productId);
        }
        await this.cartsRepository.deleteCarts(userId);
        await this.orderListsRepository.addOrderLists(carts, userId);
    };

    addCarts = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCarts(userId);
        const productInfo = await this.productsRepository.getProductsDetail(
            productId
        );
        const { productName, productPrice, imageUrl } = productInfo;
        const quantityPrice = productPrice * amount;
        if (carts) {
            const existProduct = carts.products.findIndex(
                (product) => product.productId === productId
            );
            if (existProduct > -1) {
                const product = carts.products[existProduct];
                product.amount += amount;
                product.quantityPrice += quantityPrice;
                carts.products[existProduct] = product;
            } else {
                carts.products.push({
                    amount,
                    productId,
                    productName,
                    quantityPrice,
                    imageUrl,
                });
            }
            await this.cartsRepository.addCarts(carts);
        } else {
            await this.cartsRepository.addFirstCarts(
                productId,
                amount,
                userId,
                productName,
                quantityPrice,
                imageUrl
            );
        }
    };

    updateProductAmountInCarts = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCarts(userId);
        const productInfo = await this.productsRepository.getProductsDetail(
            productId
        );
        const { productPrice } = productInfo;
        const quantityPrice = productPrice * amount;

        if (carts) {
            let existProduct = carts.products.findIndex(
                (p) => p.productId === productId
            );
            if (existProduct > -1) {
                let product = carts.products[existProduct];
                product.amount = amount;
                product.quantityPrice = quantityPrice;
                carts.products[existProduct] = product;
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
            let existProduct = carts.products.findIndex(
                (p) => p.productId === productId
            );
            if (existProduct > -1) {
                let product = carts.products[existProduct];
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
