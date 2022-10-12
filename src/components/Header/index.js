import { tplReplace } from '../../utils/tools';
import './index.scss';
import tpl from './index.tpl';
import Logo from './logo';
import Nav from './Nav';
import Search from './Search';

class Header {
  constructor(el, data) {
    this.name = 'Header';
    this.$el = el;
    this.fieldData = data.field_data;
    this.phoneData = data.phone_data;
    this.logo = new Logo();
    this.nav = new Nav();
    this.search = new Search();
    this.cache = {};
    this.init();
  }

  async init() {
    let pic = this.phoneData[0].pics;
    await this.render();
    this.bindEvent();
  }

  async render() {
    const el = tplReplace(tpl, {
      logo: this.logo.tpl(),
      nav: this.nav.tpl(this.fieldData),
      search: this.search.tpl(),
    });

    await this.$el.append(el);
  }

  bindEvent() {
    const $nav = $('.J_nav'),
      $search = $('.search-btn');

    $nav.on('mouseenter', 'li', { phoneData: this.phoneData, nav: this.nav }, this.nav.mouseenter);
    $search.click(this.search.search);
  }
}

export default Header;
