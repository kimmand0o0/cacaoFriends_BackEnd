const ProductService = require("../services/product.service.js");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  //제품 생성
    createProducts = async (req, res, next) => {
        try {
        const { characterName, productName, productPrice, content, imageUrl } = req.body;

        await this.productService.createProducts({
            characterName,
            productName,
            productPrice,
            imageUrl,
            content
        });
        res.json({ message: "생성 성공" }); 
        } catch (error) {
            next(error);
        }
    };

    //신상품 가져오기
    getProductsNew = async (req, res, next) => {
        try {
        const newList = await this.productService.getProductsNew();

        res.status(200).json({ products: newList });
        } catch (error) {
            next(error);
        }
    };

    //베스트 가져오기
    getProductsBest = async (req, res, next) => {
        try {
            const bestList = await this.productService.getProductsBest();

            res.status(200).json({ products: bestList });
        } catch (error) {
            next(error);
        }
    };

    //캐릭터별 상품 조회
    getProductsCharacterName = async (req, res, next) => {
        try {
            const { characterName } = req.params;
            
            const productscharacterName = await this.productService.getProductsCharacterName(characterName);

            res.status(200).json({ products: productscharacterName });
        } catch (error) {
            next(error);
        }
    };

    //상품 상세 조회
    getProductsDetail = async (req, res, next) => {
        try {
            const { productId } = req.params;
            const productDetail = await this.productService.getProductsDetail(productId);

            res.status(200).json({ products: productDetail });
        } catch (error) {
            next(error);
        }
    };


    }

module.exports = ProductController;
