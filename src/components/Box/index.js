import tpl from './tpl/index.tpl';
import itemTpl from './tpl/item.tpl';
import './index.scss';
import { tplReplace } from '../../utils/tools';

class Box {
  constructor(el, title, data) {
    this.name = 'Box';
    this.$el = el;
    this.title = title;
    this.data = data;

    this.init();
  }

  init() {
    this.render();
  }
  render() {
    const el = tplReplace(tpl, {
      title: this.title,
      boxItem: this.getList(),
    });
    this.$el.append(el);
  }

  getList() {
    let list = '';
    this.data.forEach((item, idx) => {
      list += tplReplace(itemTpl, {
        isFirst: idx % 5 === 0 ? 'first' : '',
        id: item.id,
        pic: JSON.parse(item.pics)[0][0][0],
        phoneName: item.phone_name,
        desc: item.slogan.substr(0, 10),
        price: item.default_price,
      });
    });

    return list;
  }
}

export default Box;
