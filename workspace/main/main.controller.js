const MainService = require("./main.service.js");

class MainController {
  constructor() {
    this.mainService = new MainService();
  }

  getProductsSlides = async (req, res, next) => {
    try {
      const slidesList = await this.mainService.getProductsSlides();

      res.status(200).json({ Slides: slidesList });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        errorMessage: "슬라이드 조회에 실패하였습니다.",
      });
    }
  };

  getProductsNew = async (req, res, next) => {
    try {
      const newList = await this.mainService.getProductsNew();

      res.status(200).json({ products: newList });
    } catch (error) {
      res.status(400).send({
        errorMessage: "신상품 조회에 실패하였습니다.",
      });
    }
  };
}

module.exports = MainController;
