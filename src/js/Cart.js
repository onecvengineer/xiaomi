import 'jquery';
import App from './App';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CartBox from '../components/cartBox';

class Cart extends App {
  constructor() {
    super({
      phone: true,
      swiper: false,
      field: true,
    });
  }

  render() {
    new Header(this.$el, this.cache);
    new CartBox(this.$el);
    new Footer(this.$el);

    $('body').prepend(this.$el);
  }
}

new Cart();
