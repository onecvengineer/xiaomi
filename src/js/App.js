import '../scss/common.scss';
import IndexModel from '../models';
class App {
  constructor(options = {}) {
    this.$el = $('<div id="app">');

    this.phone = options.phone;
    this.field = options.field;
    this.swiper = options.swiper;
    this.init();
  }
  async init() {
    await this.getData();
    this.render();
  }

  async getData() {
    const indexModel = new IndexModel();
    this.cache = await indexModel.getData({
      swiper: this.swiper,
      phone: this.phone,
      field: this.field,
    });
    console.log(this.cache);
  }
}

export default App;
