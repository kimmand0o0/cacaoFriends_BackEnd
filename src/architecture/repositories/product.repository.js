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

    getProductsAll = async ({ like, attributes, limit, order, where }) => {
        return this.productsModel.findAll({
            raw: true,
            attributes: attributes,
            like: like,
            where: where,
            order: order,
            limit: limit,
        });
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
