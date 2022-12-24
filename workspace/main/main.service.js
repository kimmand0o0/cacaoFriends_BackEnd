const MainRepository = require("./main.repository");

class MainService {
  constructor() {
    this.mainRepository = new MainRepository();
  }

  getProductsSlides = async () => {
    const slidesList = this.mainRepository.getProductsSlides();

    return slidesList;
  };

  getProductsNew = async () => {
    const newList = await this.mainRepository.getProductsNew();

    return newList;
  };
}

module.exports = MainService;
