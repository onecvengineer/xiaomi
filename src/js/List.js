import App from './App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import 'jquery';
import { getUrlQueryValue } from '../utils/tools';
import Tab from '../components/tab';

class List extends App {
  constructor() {
    super({
      phone: true,
      field: true,
    });

    this.keyword = getUrlQueryValue('keyword');
  }

  render() {
    new Header(this.$el, this.cache);
    new Tab(this.$el, this.cache, this.keyword);
    new Footer(this.$el);
    $('body').prepend(this.$el);
  }
}

new List($);
