import 'jquery';
import Box from '../components/Box';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUrlQueryValue } from '../utils/tools';
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
    new Box(this.$el, '新品上架', this.filterData('new'));
    new Box(this.$el, '超值产品', this.filterData('most_value'));
    new Box(this.$el, '官方推荐', this.filterData('recom'));
    new Footer(this.$el);
    // new Box(this.$el)
    $('body').prepend(this.$el);
  }

  filterData(field) {
    return this.cache.phone_data.filter(item => item[field] == 1);
  }
}

new Index($);
