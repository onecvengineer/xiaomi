import 'jquery';
import Box from '../components/Box';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';

import App from './App';

class Index extends App {
  constructor() {
    super({
      phone: true,
      swiper: true,
      field: true,
    });
  }

  render() {
    new Header(this.$el, this.cache);
    new Carousel(this.$el, this.cache.swiper_data);
    new Box(this.$el, this.filterData('new'), '新品上架').init();
    new Box(this.$el, this.filterData('most_value'), '超值商品').init();
    new Box(this.$el, this.filterData('recom'), '官方推荐').init();
    new Footer(this.$el);
    $('body').prepend(this.$el);
  }

  filterData(field) {
    return this.cache.phone_data.filter(item => item[field] == 1);
  }
}

new Index($);
