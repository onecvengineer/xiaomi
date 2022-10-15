import 'jquery';
import App from './App';
import { getUrlQueryValue } from '../utils/tools';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DetailBox from '../components/detail_box';
import IndexModel from '../models/index';

class Detail extends App {
  constructor() {
    super({
      phone: true,
      swiper: false,
      field: true,
    });

    this.id = getUrlQueryValue('id');
  }

  render() {
    this.phoneInfo = this.getPhoneInfo();
    new Header(this.$el, this.cache);
    new DetailBox(this.$el, this.phoneInfo);
    new Footer(this.$el);

    $('body').prepend(this.$el);
  }

  getPhoneInfo() {
    return this.cache.phone_data.filter(item => item.id === this.id)[0];
  }
}

new Detail();
