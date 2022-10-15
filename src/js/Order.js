import 'jquery';
import App from './App';
import Footer from '../components/Footer';
import Header from '../components/Header';
import OrderBox from '../components/orderBox';

class Order extends App {
  constructor() {
    super({
      phone: true,
      swiper: false,
      field: true,
    });
  }

  render() {
    new Header(this.$el, this.cache);
    new OrderBox(this.$el);
    new Footer(this.$el);

    $('body').prepend(this.$el);
  }
}

new Order();
