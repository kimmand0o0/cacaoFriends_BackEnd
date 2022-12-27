const OrdersService = require('../services/orders.service');

class OrdersController {
    ordersService = new OrdersService();

    findAllOrderLists = async (req, res) => {
        try {
            let userId = 1;
            const OrderLists = await this.ordersService.findAllOrderLists(
                userId
            );
            res.status(200).json({ OrderLists });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '주문내역조회에 실패하였습니다.',
            });
        }
    };
    addOrderLists = async (req, res) => {
        try {
            let userId = 1;
            const OrderLists = await this.ordersService.addOrderLists(userId);
            res.status(201).json({ message: '구매에 성공하였습니다.' });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '구매에 실패하였습니다.',
            });
        }
    };

    findCarts = async (req, res) => {
        try {
            let userId = 1;
            const Carts = await this.ordersService.findCarts(userId);
            res.status(200).json({ Carts });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '장바구니 조회에 실패하였습니다.',
            });
        }
    };

    addCarts = async (req, res) => {
        try {
            let userId = 1;
            const { productId, amount } = req.body;
            const Carts = await this.ordersService.addCarts(
                productId,
                amount,
                userId
            );
            res.status(200).json({
                message: '장바구니 담기에 성공하였습니다.',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '장바구니 담기에 실패하였습니다.',
            });
        }
    };

    updateProductAmountInCarts = async (req, res) => {
        try {
            let userId = 1;
            const productId = Number(req.params.productId);
            const { amount } = req.body;
            const Carts = await this.ordersService.updateProductAmountInCarts(
                productId,
                amount,
                userId
            );
            res.status(200).json({
                message: '수량이 정상적으로 수정되었습니다.',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '수량 수정에 실패하였습니다.',
            });
        }
    };

    deleteProductInCarts = async (req, res) => {
        try {
            let userId = 1;
            const productId = Number(req.params.productId);
            const Carts = await this.ordersService.deleteProductInCarts(
                productId,
                userId
            );
            res.status(201).json({
                message: '정상적으로 삭제되었습니다.',
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                errorMessage: '삭제에 실패하였습니다.',
            });
        }
    };
}

module.exports = OrdersController;
