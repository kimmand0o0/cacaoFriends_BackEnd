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
    getProductscharacterName = async (req, res, next) => {
        try {
            const { characterName } = req.params;
            
            const productscharacterName = await this.productService.getProductscharacterName(characterName);

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

        // //숏 클립 생성
    // createProductsShorts = async (req, res, next) => {
    //     try {
    //       const { content, videoUrl, productId } = req.body;
    
    //       await this.productService.createProductsShorts({
    //         content,
    //         videoUrl,
    //         productId
    //       });
    //       res.json({ message: "생성 성공" });
    //     } catch (error) {
    //       console.log(error);
    //       res.status(400).send({
    //         errorMessage: "쇼츠 생성에 실패하였습니다.",
    //       });
    //     }
    //   };

    // //slide 생성
    // createProductsSlides = async (req, res, next) => {
    //     try {
    //     const { title, content, productId } = req.body;
    
    //     let slideImg = undefined;
    //     if (req.file) {
    //         slideImg = req.file.location;
    //     } else {
    //         slideImg = 1;
    //     }
    
    //     await this.productService.createProductsSlides({
    //         productId,
    //         title,
    //         content,
    //         slideImg,
    //     });
    //     res.json({ message: "생성 성공" });
    //     } catch (error) {
    //     console.log(error);
    //     res.status(400).send({
    //         errorMessage: "슬라이드 생성에 실패하였습니다.",
    //     });
    //     }
    // };

    // //slide 가져오기
    // getProductsSlides = async (req, res, next) => {
    //     try {
    //     const slidesList = await this.productService.getProductsSlides();

    //     res.status(200).json({ Slides: slidesList });
    //     } catch (error) {
    //     console.log(error);
    //     res.status(400).send({
    //         errorMessage: "슬라이드 조회에 실패하였습니다.",
    //     });
    //     }
    // };

    // //프로모션 가져오기
    // getProductsPromotion = async (req, res, next) => {
    //     try {
    //     const promotionList = await this.productService.getProductsPromotion();

    //     res.status(200).json({ products: promotionList });
    //     } catch (error) {
    //     res.status(400).send({
    //         errorMessage: "신상품 조회에 실패하였습니다.",
    //     });
    //     }
    // };

    // //쇼츠 가져오기
    // getProductsShorts = async (req, res, next) => {
    //     try {
    //         const shortsList = await this.productService.getProductsShorts();

    //         res.status(200).json({ products: shortsList });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).send({
    //             errorMessage: "쇼츠 조회에 실패하였습니다.",
    //         });
    //     }
    // };

    }

module.exports = ProductController;
