const OrderListsRepository = require('../repositories/orders.repository');
const productsRepository = require('../repositories/product.repository');
const { OrderLists, Carts, Products } = require('../../models');

const {
    InvalidParamsError,
} = require('../../middlewares/exceptions/error.class.js');

class OrdersService {
    orderListsRepository = new OrderListsRepository(OrderLists);
    cartsRepository = new OrderListsRepository(Carts);
    productsRepository = new productsRepository(Products);

    findAllOrderLists = async (userId) => {
        return this.orderListsRepository.findAllOrderLists(userId);
    };

    findCart = async (userId) => {
        const carts = await this.cartsRepository.findCart(userId);

        return carts || {};
    };

    directOrderLists = async (productId, amount, userId) => {
        const productInfo = await this.productsRepository.getProductsDetail(
            productId
        );
        if (!productInfo) {
            throw new InvalidParamsError('존재하지않는 상품입니다.');
        }
        const { productName, productPrice, imageUrl } = productInfo;
        const quantityPrice = productPrice * amount;
        await this.productsRepository.addAmount(amount, productId);
        await this.orderListsRepository.directOrderLists(
            amount,
            userId,
            productId,
            productName,
            quantityPrice,
            imageUrl
        );
    };

    addOrderLists = async (userId) => {
        const carts = await this.cartsRepository.findCart(userId);
        if (!carts) {
            throw new InvalidParamsError('장바구니가 비었습니다.');
        }

        const list = carts.products;
        for (const i in list) {
            const amount = list[i].amount;
            const productId = list[i].productId;
            await this.productsRepository.addAmount(amount, productId);
        }
        await this.cartsRepository.deleteCart(userId);
        await this.orderListsRepository.addOrderLists(carts, userId);
    };

    addCart = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCart(userId);
        const productInfo = await this.productsRepository.getProductsDetail(
            productId
        );
        if (!productInfo) {
            throw new InvalidParamsError('존재하지않는 상품입니다.');
        }
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
                carts.products.unshift({
                    amount,
                    productId,
                    productName,
                    quantityPrice,
                    imageUrl,
                });
            }
            await this.cartsRepository.addCart(carts);
        } else {
            await this.cartsRepository.addFirstCart(
                productId,
                amount,
                userId,
                productName,
                quantityPrice,
                imageUrl
            );
        }
    };

    updateProductAmountInCart = async (productId, amount, userId) => {
        const carts = await this.cartsRepository.findCart(userId);
        const productInfo = await this.productsRepository.getProductsDetail(
            productId
        );
        if (!productInfo) {
            throw new InvalidParamsError('존재하지않는 상품입니다.');
        }
        const { productPrice } = productInfo;
        const quantityPrice = productPrice * amount;

        if (carts) {
            const existProduct = carts.products.findIndex(
                (product) => product.productId === productId
            );
            if (existProduct > -1) {
                const product = carts.products[existProduct];
                product.amount = amount;
                product.quantityPrice = quantityPrice;
                carts.products[existProduct] = product;
                await this.cartsRepository.addCart(carts);
            } else {
                throw new InvalidParamsError(
                    '장바구니에 등록되지않은 상품입니다.'
                );
            }
        } else {
            throw new InvalidParamsError('빈 장바구니입니다.');
        }
    };

    deleteProductInCart = async (productId, userId) => {
        const carts = await this.cartsRepository.findCart(userId);

        if (carts) {
            let existProduct = carts.products.findIndex(
                (product) => product.productId === productId
            );
            if (existProduct > -1) {
                const product = carts.products[existProduct];
                const products = carts.products.filter((x) => x !== product);
                if (products.length === 0) {
                    await this.cartsRepository.deleteCart(userId);
                } else {
                    carts.products = products;

                    await this.cartsRepository.addCart(carts);
                }
            } else {
                throw new InvalidParamsError(
                    '장바구니에 등록되지않은 상품입니다.'
                );
            }
        } else {
            throw new InvalidParamsError('빈 장바구니입니다.');
        }
    };
}

module.exports = OrdersService;
